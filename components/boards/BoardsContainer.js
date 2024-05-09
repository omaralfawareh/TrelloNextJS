import { useContext, useEffect, useState } from "react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import AuthContext from "@/store/auth-context";
import BoardCard from "./BoardCard";
function BoardsContainer() {
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  async function addBoardHandler() {
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
  const fetchBoards = async () => {
    console.log(authCtx.user.uid);
    const token = await authCtx.user.getIdToken();
    console.log("token", token);
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

  useEffect(() => {
    try {
      fetchBoards();
    } catch (error) {
      console.log("FAILED => ", error);
    }
  }, []);
  return (
    <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full rounded-lg border-solid border-2">
      <h1 className="text-3xl">
        Welcome {authCtx?.user?.displayName || authCtx?.user?.email || ""} to
        your <strong>DashBoard</strong>
      </h1>
      <div className="w-full flex flex-row p-10 gap-2 flex-wrap justify-center">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            name={board.name}
            description={board.description}
          />
        ))}
        <button onClick={addBoardHandler}>New Board</button>

        {console.log("SUCCESS => ", boards)}
      </div>
    </div>
  );
}
export default BoardsContainer;
