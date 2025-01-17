import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import AuthContext from "@/store/auth-context";
import Card from "@/components/cards/Card";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import ListCard from "../../components/lists/listCard";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
function Board() {
  const authCtx = useContext(AuthContext);
  const { boardID } = useRouter().query;
  const queryClient = useQueryClient();
  const overIdTest = useRef(null);
  const activeIdTest = useRef(null);
  const [activeCard, setActiveCard] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overid } = over;
    console.log("omar idss", id, overid);
    if (
      !activeIdTest.current ||
      !overIdTest.current ||
      activeIdTest.current === overIdTest.current
    ) {
      return;
    }
    const activeContainer = findContainer(id);

    const activeCard = queryClient
      .getQueryData(["cards", activeContainer.id, boardID])
      .find((card) => card.id === id);
    try {
      await setDoc(
        doc(
          collection(
            db,
            `users/${authCtx?.user?.uid}/boards/${boardID}/lists/${overIdTest.current}/cards`,
          ),
          id,
        ),
        activeCard,
      );
      queryClient.invalidateQueries(["cards", overIdTest.current, boardID]);
    } catch (error) {
      console.log("Error adding card to new list:", error);
    }

    try {
      const activeDoc = doc(
        db,
        `users/${authCtx?.user?.uid}/boards/${boardID}/lists/${activeIdTest.current}/cards/${id}`,
      );
      await deleteDoc(activeDoc);
      queryClient.invalidateQueries(["cards", activeIdTest.current, boardID]);
      activeIdTest.current = null;
    } catch (error) {
      console.log("Error deleting card:", error);
    }
  };
  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    const activeContainer = findContainer(id);

    const activeCard = queryClient
      .getQueryData(["cards", activeContainer.id, boardID])
      .find((card) => card.id === id);
    setActiveCard(activeCard);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    if (!activeIdTest.current) {
      activeIdTest.current = activeContainer?.id;
    }
    overIdTest.current = overContainer?.id;
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    const overItems = queryClient.getQueryData([
      "cards",
      overContainer.id,
      boardID,
    ]);
    const overIndex = overItems?.findIndex((item) => item.id === overId);
    let newIndex;

    const isBelowLastItem =
      over &&
      overIndex === overItems?.length - 1 &&
      draggingRect?.offsetTop > over.rect?.offsetTop + over.rect?.height;
    const modifier = isBelowLastItem ? 1 : 0;

    newIndex = overIndex >= 0 ? overIndex + modifier : overItems?.length + 1;
    const activeCard = queryClient
      .getQueryData(["cards", activeContainer.id, boardID])
      .find((card) => card.id === id);
    // setActiveCard(activeCard);
    queryClient.setQueryData(
      ["cards", activeContainer.id, boardID],
      (oldData) => oldData.filter((card) => card.id !== id),
    );

    queryClient.setQueryData(
      ["cards", overContainer.id, boardID],
      (oldData) => {
        const cardExists = oldData.some((card) => card.id === activeCard.id);
        if (!cardExists) {
          return [
            ...oldData.slice(0, newIndex),
            activeCard,
            ...oldData.slice(newIndex),
          ];
        }
        return oldData;
      },
    );
  }

  const fetchLists = async () => {
    const querySnapshot = await getDocs(
      collection(db, `users/${authCtx?.user?.uid}/boards/${boardID}/lists`),
    );
    const data = [];
    querySnapshot.docs.map((doc) => {
      const list = { id: doc.id, ...doc.data() };
      data.push(list);
    });
    return data;
  };

  const { data: lists, isLoading } = useQuery({
    queryKey: ["lists", boardID],
    queryFn: fetchLists,
    enabled: !!authCtx?.user,
  });
  function findContainer(id) {
    const lists = queryClient.getQueryData(["lists", boardID]);
    const container = lists.find((item) => {
      const cards = queryClient.getQueryData(["cards", item.id, boardID]);
      return cards.find((item) => item.id === id);
    });

    return container;
  }

  const { mutate: addList, isPending } = useMutation({
    mutationFn: () => {
      addDoc(
        collection(db, `users/${authCtx?.user?.uid}/boards/${boardID}/lists`),
        {
          name: "List",
          description: "This is a new List",
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists", boardID]);
    },
    onError: (error) => {
      console.error("Error adding list to board:", error);
    },
  });

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full h-full rounded-lg min-h-[80vh]">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl ">
            <strong>Board</strong> = {boardID}
          </h1>
          <div className="flex  flex-col justify-center items-center bg-blue-500 rounded-xl px-3 py-1 min-w-[100px]">
            {!isPending ? (
              <button onClick={addList} disabled={isPending}>
                Add List
              </button>
            ) : (
              <div className="h-4 w-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
          {isLoading ? (
            <div className="flex items-center justify-center justify-self-center self-center">
              <div className="h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex w-full h-full gap-5 justify-start">
              {lists?.map(({ id, name, description }) => (
                <ListCard
                  id={id}
                  key={id}
                  name={name}
                  description={description}
                  boardID={boardID}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <DragOverlay>{activeCard ? <Card {...activeCard} /> : null}</DragOverlay>
    </DndContext>
  );
}
export default Board;
