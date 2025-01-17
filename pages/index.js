import HomePage from "../components/Home";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import BoardsContainer from "../components/boards/BoardsContainer";
import { authAdmin } from "../firebase-admin";

export default function Home() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center">
      {authCtx?.user ? <BoardsContainer /> : <HomePage />}
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const cookies = ctx.req.cookies;
  const token = cookies.token || null;
  console.log("token", token);
  try {
    // Verify the token
    if (!token) return { props: { user: null } };
    const decodedToken = await authAdmin.verifyIdToken(token);

    // Token is valid, decodedToken will contain user info
    console.log("User Verified token:", decodedToken);

    return { props: { user: decodedToken } };
  } catch (error) {
    // Handle error if token is invalid
    // TODO: Better handle this case (ex: redirect to login)
    console.error("Error verifying token:", error.message);
    return { props: { error: true } };
  }
}
