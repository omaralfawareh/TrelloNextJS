import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/store/auth-context";

function Navbar() {
  const authCtx = useContext(AuthContext);

  return (
    <nav className="flex justify-center p-2 bg-gray-900 fixed w-full text-xl z-10">
      <div className="flex content-center justify-between w-[80%] p-1 rounded-lg">
        <Link
          type="button"
          href="/login"
          className="align-middle button bg-blue-700 text-base font-bold"
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
              href="/about"
              className=" text-center hover:text-blue-700 font-bold"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="align-center hover:text-blue-700 font-bold"
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
            className="align-middle button bg-blue-700 text-base font-bold"
          >
            <span>Logout</span>
          </Link>
        ) : (
          <Link
            type="button"
            href="/login"
            className="align-middle button bg-blue-700 text-base font-bold"
          >
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
