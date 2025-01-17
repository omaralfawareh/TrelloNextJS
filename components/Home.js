import Link from "next/link";
function HomePage() {
  return (
    <div className="w-1/2 text-center ">
      <h1 className="text-6xl mt-10 mb-5">Welcome to Treplica</h1>
      <p>
        Step into the realm of efficient project management and collaboration
        with the Trello Board Replica Web App. Drawing inspiration from the
        acclaimed productivity platform, Trello, this replica offers a seamless
        and intuitive experience for organizing tasks, fostering teamwork, and
        achieving goals.
      </p>
      <ul className="flex flex-col justify-center mt-5">
        <li>
          <Link
            type="button"
            href="/login"
            className="text-black bg-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-4 py-2 text-center"
          >
            Login to Continue
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default HomePage;
