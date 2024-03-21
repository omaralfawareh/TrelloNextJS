import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthContext from "@/store/auth-context";

function Navbar() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className="flex justify-center bg-gray-900 fixed w-full">
      <div className="flex content-center justify-between w-[80%] p-1 rounded-lg">
        <Link
          type="button"
          href="/login"
          className="align-middle button bg-blue-700"
        >
          <span>Treplica Logo</span>
        </Link>
        <ul className="flex items-center content-end flex-row pt-1 space-x-10 block">
          <li>
            <Link
              href="/"
              className="hover:text-blue-700 font-bold"
              aria-current="page"
            >
              <span className="text-center">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className=" text-center hover:text-blue-700 font-bold"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="align-middle hover:text-blue-700 font-bold"
            >
              Contact
            </Link>
          </li>
        </ul>
        {authCtx.user ? (
          <Link
            type="button"
            onClick={authCtx.signOut}
            href="/"
            className="align-middle button bg-blue-700"
          >
            <span>SignOut</span>
          </Link>
        ) : (
          <Link
            type="button"
            href="/login"
            className="align-middle button bg-blue-700"
          >
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
