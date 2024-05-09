import HomePage from "../components/Home";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import BoardsContainer from "../components/boards/BoardsContainer";

export default function Home() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center">
      {authCtx.user ? <BoardsContainer /> : <HomePage />}
      {/* soon load boards component if user is available */}
    </div>
  );
}
