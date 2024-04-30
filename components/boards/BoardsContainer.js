import { useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import AuthContext from "@/store/auth-context";
import BoardCard from "./BoardCard";
function BoardsContainer() {
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  function addBoardHandler() {
    fetch("/api/boards/newBoard", {
      method: "POST",
      body: JSON.stringify({
        name: "omarBoard",
        description: "this is a new board made by a post request",
      }),
    });
  }

  useEffect(() => {
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
    try {
      fetchBoards();
    } catch (error) {
      console.log("FAILED => ", error);
    }
  }, []);
  return (
    <div className="flex flex-col gap-5 items-center p-10 pt-5 border-solid border-2 w-full rounded-lg">
      <h1 className="text-3xl">
        Welcome {authCtx?.user?.displayName || authCtx?.user?.email || ""} to
        your <strong>DashBoard</strong>
      </h1>
      <div className="w-full flex flex-row p-10 gap-2 flex-wrap justify-center ">
        {/* {boards.map((board) => (
          <BoardCard />
        ))} */}
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <button onClick={addBoardHandler}>New Board</button>

        {console.log("SUCCESS => ", boards)}
      </div>
    </div>
  );
}
export default BoardsContainer;
