import { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  function validateEmail(email) {
    // TODO: Add email validation
    return true;
  }
  // eslint-disable-next-line no-unused-vars
  function validatePassword(password) {
    // TODO: Add email validation
    return true;
  }
  function handleFeedback(event) {
    event.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
      });
    }
  }
  if (authCtx?.user) {
    router.push("/");
  }
  return (
    <>
      <div className="flex flex-col justify-center content-center items-center py-24">
        <div
          className="container lg:w-1/3 md:w-full rounded-xl p-10 pt-5"
          style={{ boxShadow: "rgba(255, 255, 255, 0.14) 0px 0px 0px 1px" }}
        >
          <form onSubmit={handleFeedback}>
            <div className="flex flex-col p-4 pt-2">
              <h1 className="mb-5 font-bold">Login to your account</h1>
              <label className="text-sm font-medium" htmlFor="email">
                Your email
              </label>
              <input
                className="input"
                type="email"
                placeholder="Enter email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password" className="text-sm font-medium">
                Your password
              </label>
              <input
                className="input"
                type="password"
                placeholder="Enter password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="button hover:text-blue-500 hover:border-blue-500 !text-black">
                Login
              </button>
              <button
                onClick={authCtx.googleLogin}
                className="button bg-white border border-black !text-black hover:text-blue-500 hover:border-blue-500 hover:bg-white"
              >
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
