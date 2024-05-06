function BoardCard({ name, description }) {
  return (
    <>
      <div class="block max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </>
  );
}
export default BoardCard;
