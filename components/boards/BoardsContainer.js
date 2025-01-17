import { useContext } from "react";
import { db } from "@/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import AuthContext from "@/store/auth-context";
import BoardCard from "./BoardCard";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function BoardsContainer() {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();

  const fetchBoards = async () => {
    const querySnapshot = await getDocs(
      collection(db, `users/${authCtx.user.uid}/boards`),
    );
    const data = [];
    querySnapshot.docs.map((doc) => {
      const board = { id: doc.id, ...doc.data() };
      data.push(board);
    });
    return data;
  };

  const { data: boards } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
    enabled: !!authCtx?.user,
  });

  const { mutate: createBoard, isPending } = useMutation({
    mutationFn: async () => {
      // Make new board
      addDoc(collection(db, `users/${authCtx?.user?.uid}/boards`), {
        name: "New Board",
        description: "This is a new board",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
    },
    onError: (error) => {
      console.error("Error adding board:", error);
    },
  });
  return (
    <div className="flex flex-col gap-5 items-center p-10 pt-5 w-full rounded-lg relative min-h-[80vh] ">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl">
          Welcome {authCtx?.user?.name || authCtx?.user?.displayName} to your{" "}
          <strong>DashBoard</strong>
        </h1>
        <div className="flex flex-col justify-center items-center bg-blue-500 rounded-xl px-3 py-1 min-w-[100px]">
          {!isPending ? (
            <button onClick={createBoard} disabled={isPending}>
              Add Board
            </button>
          ) : (
            <div className="h-4 w-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-full min-h-[70vh]">
        {boards ? (
          <div className="w-full flex flex-row-reverse p-10 gap-2 flex-wrap justify-end ">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                id={board.id}
                name={board.name}
                description={board.description}
                {...board}
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
