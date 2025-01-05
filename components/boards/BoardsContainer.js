import { useContext, useEffect, useState } from "react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import AuthContext from "@/store/auth-context";
import BoardCard from "./BoardCard";
function BoardsContainer() {
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState(null);
  const fetchBoards = async () => {
    if (!authCtx?.user) return;
    const userBoardsRef = collection(db, `users/${authCtx.user.uid}/boards`);
    const querySnapshot = await getDocs(userBoardsRef);
    const data = [];
    querySnapshot.docs.map((doc) => {
      // console.log(doc);
      const board = { id: doc.id, ...doc.data() };
      data.push(board);
    });
    setBoards(data);
  };
  async function addNewBoard() {
    try {
      const response = await fetch("/api/boards/newBoard", {
        method: "POST",
        body: JSON.stringify({
          name: "omarBoard",
          description: "this is a new board made by a post request",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed", response.error);
      }
      fetchBoards();
    } catch (error) {
      console.log("Failed sending board => ", error);
    }
  }

  useEffect(() => {
    try {
      fetchBoards();
    } catch (error) {
      console.log("FAILED => ", error);
    }
  }, [authCtx.user]);

  return (
    <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full rounded-lg relative min-h-[80vh] border-2">
      <h1 className="text-3xl">
        Welcome {authCtx?.user?.name || authCtx?.user?.displayName} to your{" "}
        <strong>DashBoard</strong>
      </h1>
      <button
        className="bg-blue-500 rounded px-3 py-1 text-lg absolute mr-3 right-0"
        onClick={addNewBoard}
      >
        Add Board
      </button>

      <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
        {boards ? (
          <div className="w-full flex flex-row p-10 gap-2 flex-wrap justify-center">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                id={board.id}
                name={board.name}
                description={board.description}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center justify-self-center self-center">
            <div className="h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
export default BoardsContainer;
