import Link from "next/link";
function HomePage() {
  return (
    <div className="w-1/2 border-solid border-2 text-center border-white ">
      <h1 className="text-6xl mt-10 mb-5">Welcome to Treplica</h1>
      <p>
        Step into the realm of efficient project management and collaboration
        with the Trello Board Replica Web App, meticulously engineered by web
        developer <strong>Omar Alfawareh</strong> using Next.js. Drawing
        inspiration from the acclaimed productivity platform, Trello, this
        replica offers a seamless and intuitive experience for organizing tasks,
        fostering teamwork, and achieving goals.
      </p>
      <ul className="flex flex-col justify-center mt-5">
        <li>
          <Link
            type="button"
            href="/login"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to Continue
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default HomePage;
