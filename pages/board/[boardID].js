import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
import BoardCard from "../../components/boards/BoardCard";

function Board({}) {
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
    if (authCtx?.user) {
      try {
        fetchBoards();
      } catch (error) {
        console.log("FAILED => ", error);
      }
    }
  }, [authCtx.user, boardID]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full rounded-lg border-solid border-2">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full rounded-lg border-solid border-2">
        <h1 className="text-3xl">
          <strong>Board</strong> = {boardID}
        </h1>
        <div className="w-full flex flex-row p-10 gap-2 flex-wrap justify-center">
          {lists.map((list) => (
            <BoardCard
              key={list.id}
              id={list.id}
              name={list.name}
              description={list.description}
            />
          ))}
          {/* <button onClick={addBoardHandler}>New Board</button> */}
        </div>
      </div>
    </>
  );
}
export default Board;
