import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
import ListCard from "../../components/lists/listCard";
import { getAuth } from "firebase/auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function Board() {
  const authCtx = useContext(AuthContext);
  const { boardID } = useRouter().query;
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   async function addBoardHandler() {
  //     try {
  //       const response = await fetch("/api/boards/newBoard", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: "omarBoard",
  //           description: "this is a new board made by a post request",
  //         }),
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed", response.error);
  //       }
  //       fetchBoards();
  //     } catch (error) {
  //       console.log("Failed sending board => ", error);
  //     }
  //   }
  const fetchBoards = async () => {
    if (!authCtx?.user) return;
    const userBoardsRef = collection(
      db,
      `users/${authCtx.user.uid}/boards/${boardID}/lists`
    );
    const querySnapshot = await getDocs(userBoardsRef);
    const data = [];
    querySnapshot.docs.map((doc) => {
      console.log("doc =", doc);
      const board = { id: doc.id, ...doc.data() };
      data.push(board);
    });
    setLists(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const user = getAuth();
    console.log("USER ==> ", user.currentUser);
    if (authCtx?.user) {
      try {
        fetchBoards();
      } catch (error) {
        console.log("FAILED => ", error);
      }
    }
  }, [authCtx.user]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full rounded-lg border-solid border-2">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full h-full rounded-lg border-solid border-2">
      <h1 className="text-2xl">
        <strong>Board</strong> = {boardID}
      </h1>
      <DragDropContext>
        <Droppable droppableId="cards">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full flex h-full flex-row gap-5 flex-wrap justify-center"
            >
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <ListCard
                      id={list.id}
                      name={list.name}
                      description={list.description}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {/* <button onClick={addBoardHandler}>New Board</button> */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default Board;
