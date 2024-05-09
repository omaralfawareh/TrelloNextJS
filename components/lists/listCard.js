import Card from "../cards/Card";
function ListCard({ name }) {
  return (
    <div className="block max-w-sm w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <div className="flex flex-col gap-2">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
export default ListCard;
