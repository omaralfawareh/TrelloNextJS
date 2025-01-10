import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
import ListCard from "../../components/lists/listCard";
import { getAuth } from "firebase/auth";
function Board() {
  const authCtx = useContext(AuthContext);
  const { boardID } = useRouter().query;
  // eslint-disable-next-line no-unused-vars
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
      `users/${authCtx.user.uid}/boards/${boardID}/lists`,
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

  return (
    <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full h-full rounded-lg border-solid border-2 min-h-[80vh]">
      <h1 className="text-2xl">
        <strong>Board</strong> = {boardID}
      </h1>
      <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
        {isLoading ? (
          <div className="flex items-center justify-center justify-self-center self-center">
            <div className="h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="w-full flex h-full flex-row gap-5 flex-wrap justify-center">
            {[1, 2, 3].map((list, index) => (
              <ListCard
                key={index}
                id={index}
                name={"test"}
                description={"this is a test"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Board;
