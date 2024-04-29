import { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const authCtx = useContext(AuthContext);

  function validateEmail(email) {
    return true;
  }
  function validatePassword(password) {
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
  return (
    <>
      <div className="flex  min-h-screen flex-col justify-center content-center items-center py-24">
        <div className="container lg:w-1/3 md:w-full bg-gray-900 rounded-xl p-10 pt-5">
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
              <button className="button">Login</button>
              <button
                onClick={authCtx.googleLogin}
                className="button bg-white border border-black hover:text-blue-500 hover:border-blue-500 hover:bg-white text-black"
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
