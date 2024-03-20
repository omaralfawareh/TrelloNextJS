import { useContext } from "react";
import AuthContext from "@/store/auth-context";

function BoardsContainer() {
  const authCtx = useContext(AuthContext);
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
