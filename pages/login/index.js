import Link from "next/link";

function Login() {
  return (
    <>
      <div className="flex  min-h-screen flex-col justify-center content-center items-center py-24 border-solid border-2">
        <div className="container lg:w-1/3 md:w-full bg-gray-900 rounded-xl p-10 pt-5">
          <form action="">
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
              />
              <label htmlFor="password" className="text-sm font-medium">
                Your password
              </label>
              <input
                className="input"
                type="password"
                placeholder="Enter password"
                id="password"
              />
              <button href="/api/hello" className="button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
