import { db } from "@/firebase";
import AuthContext from "@/store/auth-context";
import { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Trash from "@/components/svgs/Trash";

function BoardCard({ name, description, id }) {
  const authCtx = useContext(AuthContext);
  const queryClient = useQueryClient();
  const boardRef = doc(db, `users/${authCtx?.user?.uid}/boards/${id}`);

  const handleDeleteBoard = async () => {
    try {
      await deleteDoc(boardRef);
      console.log(boardRef);
    } catch (e) {
      console.log(e.message);
    }
  };

  //TODO:Add confirmation to delete board
  const { mutate: deleteBoard } = useMutation({
    mutationFn: handleDeleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
    },
    onError: (error) => {
      console.error("Error deleteing board:", error);
    },
  });

  return (
    <div className="block relative max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <button onClick={deleteBoard} className="flex gap-2 absolute right-6">
        <Trash className={"hover:text-red-500"} />
      </button>
      <Link href={`/board/${id}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </Link>
    </div>
  );
}
export default BoardCard;
