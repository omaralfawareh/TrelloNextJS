import { useContext, useEffect, useState } from "react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import AuthContext from "@/store/auth-context";
import BoardCard from "./BoardCard";
function BoardsContainer() {
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchBoards = async () => {
      console.log(authCtx.user.uid);
      const userBoardsRef = collection(db, `users/${authCtx.user.uid}/boards`);
      const querySnapshot = await getDocs(userBoardsRef);
      const data = [];
      querySnapshot.docs.map((doc) => {
        data.push(doc.data());
      });
      setBoards(data);
    };
    try {
      fetchBoards();
      // console.log("SUCCESS => ", boards);
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
        {boards.map((board) => (
          <BoardCard />
        ))}
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </div>
    </div>
  );
}
export default BoardsContainer;
