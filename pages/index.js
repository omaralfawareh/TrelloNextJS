import { Inter } from "next/font/google";
import HomePage from "../components/Home";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import BoardsContainer from "../components/boards/BoardsContainer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const authCtx = useContext(AuthContext);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 border-solid border-2 border-white `}
    >
      {authCtx.user ? <BoardsContainer /> : <HomePage />}
      {/* soon load boards component if user is available */}
    </main>
  );
}
