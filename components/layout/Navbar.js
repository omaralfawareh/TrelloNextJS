import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/store/auth-context";
import classNames from "classnames";

function Navbar({ className }) {
  const authCtx = useContext(AuthContext);

  return (
    <nav
      className={classNames(
        "flex justify-center p-2 bg-black shadow-md  fixed w-full text-xl z-10 text-[18px] text-[#888888]",
        className,
      )}
      style={{ boxShadow: "rgb(51, 51, 51) 0px -1px 0px 0px inset" }}
    >
      <div className="flex content-center justify-between w-full py-1 px-10 rounded-lg">
        <Link
          type="button"
          href="/login"
          className="align-middle button !bg-black font-bold !text-white"
          style={{ boxShadow: "rgba(255, 255, 255, 0.14) 0px 0px 0px 1px" }}
        >
          <span>Treplica Logo</span>
        </Link>
        <ul className="flex items-center content-end flex-row pt-1 space-x-10 block text-[18px]">
          <li>
            <Link href="/" className="hover:text-white" aria-current="page">
              <span className="text-center">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className=" text-center hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="align-center hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
        {authCtx?.user ? (
          <Link
            type="button"
            onClick={authCtx.signOut}
            href="/"
            className="align-middle button !text-black bg-white font-bold"
          >
            <span>Logout</span>
          </Link>
        ) : (
          <Link
            type="button"
            href="/login"
            className="align-middle button !text-black bg-white font-bold"
          >
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
