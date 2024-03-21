import { useContext, useEffect } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "@/store/auth-context";

function BoardsContainer() {
  const authCtx = useContext(AuthContext);
  let board = "";
  async function fetchBoard() {
    try {
      const usersRef = doc(db, "users", authCtx.user.uid);
      data = await getDoc(usersRef);
    } catch (e) {
      console.log(e.message);
      return;
    }
    console.log(data.data().board);
  }
  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <>
      <h1>
        Welcome {authCtx?.user?.displayName || authCtx?.user?.email || ""} to
        your <strong>DashBoard</strong>
      </h1>
    </>
  );
}
export default BoardsContainer;
