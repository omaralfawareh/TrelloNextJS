import Card from "../cards/Card";
import { useContext } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { getDocs, collection, addDoc } from "firebase/firestore";
import AuthContext from "@/store/auth-context";
import { db } from "@/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";

function ListCard({ id, boardID }) {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();

  const fetchCards = async () => {
    const querySnapshot = await getDocs(
      collection(
        db,
        `users/${authCtx?.user?.uid}/boards/${boardID}/lists/${id}/cards`,
      ),
    );
    const data = [];
    querySnapshot.docs.map((doc) => {
      const list = { id: doc.id, ...doc.data() };
      data.push(list);
    });
    return data;
  };
  const { data: cards, isLoading } = useQuery({
    queryKey: ["cards", id, boardID],
    queryFn: fetchCards,
    enabled: !!authCtx?.user,
  });

  const { mutate: addCard, isPending } = useMutation({
    mutationFn: () => {
      addDoc(
        collection(
          db,
          `users/${authCtx?.user?.uid}/boards/${boardID}/lists/${id}/cards`,
        ),
        {
          name: "New Card",
          description: "This is a new Card",
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cards", id, boardID]);
    },
    onError: (error) => {
      console.error("Error adding list to board:", error);
    },
  });

  if (isLoading) return null;
  return (
    <SortableContext id={id} items={cards?.map((item) => item.id)}>
      <div className="block max-w-sm w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
          {id}
        </h5>

        <div className="flex flex-col gap-2">
          {/* Mapping through an array to create draggable cards */}
          {cards?.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
            />
          ))}
          <button
            className={classNames(
              "w-full flex justify-center items-center gap-1",
              {
                "cursor-not-allowed": isPending,
              },
            )}
            onClick={addCard}
            disabled={isPending}
          >
            {isPending ? (
              <div className="h-4 w-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <div>+</div>
            )}{" "}
            Add Card
          </button>
        </div>
      </div>
    </SortableContext>
  );
}

export default ListCard;
