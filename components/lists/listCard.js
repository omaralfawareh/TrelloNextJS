import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../cards/Card";

function ListCard({ name }) {
  return (
    <div className="block max-w-sm w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <DragDropContext>
        <Droppable droppableId="cards" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2"
            >
              {/* Mapping through an array to create draggable cards */}
              {[1, 2, 3].map((index) => (
                <Draggable
                  key={`card-${index}`}
                  draggableId={`card-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ListCard;
