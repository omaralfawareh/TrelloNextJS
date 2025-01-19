import React, { useState, useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AuthContext from "@/store/auth-context";
import Modal from "../modal/modal";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useQueryClient } from "@tanstack/react-query";

function Card({ id, name, description, listId, boardID }) {
  const authCtx = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameState, setNameState] = useState(name);
  const [descriptionState, setDescriptionState] = useState(description);
  const queryClient = useQueryClient();
  const cardRef = doc(
    db,
    `users/${authCtx?.user?.uid}/boards/${boardID}/lists/${listId}/cards/${id}`,
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const saveCard = async () => {
    await updateDoc(cardRef, {
      name: nameState,
      description: descriptionState,
    });
    queryClient.invalidateQueries(["cards", listId, boardID]);
    setIsModalOpen(false);
  };
  const deleteCard = async () => {
    await deleteDoc(cardRef);
    queryClient.invalidateQueries(["cards", listId, boardID]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDescriptionState(description);
          setNameState(name);
        }}
      >
        <div
          className="bg-black w-full rounded-xl p-10 pt-5"
          style={{ boxShadow: "rgba(255, 255, 255, 0.14) 0px 0px 0px 1px" }}
        >
          <form className="flex flex-col p-4 pt-2" action={saveCard}>
            <div className="flex flex-col gap-1 justify-start items-start">
              <label className="text-sm font-medium " htmlFor="email">
                Name
              </label>
              <input
                className="input !rounded-sm w-full"
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
                id="email"
              />
            </div>
            <div className="flex flex-col gap-3 justify-start items-start">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                className="input w-full !rounded-sm"
                value={descriptionState}
                onChange={(e) => setDescriptionState(e.target.value)}
                id="description"
              />
            </div>
            <button
              onClick={saveCard}
              type="submit"
              className="button hover:!text-blue-500 !text-black"
            >
              Save
            </button>
            <button
              onClick={deleteCard}
              className="button bg-white border border-black hover:bg-red-500 hover:!text-white !text-black"
            >
              Delete Card
            </button>
          </form>
        </div>
      </Modal>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className=" max-w-sm w-full p-6 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={() => {
          console.log("omar dragging", isDragging);
          // if (!isDragging) {
          setIsModalOpen(true);
          // }
        }}
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </>
  );
}
export default Card;
