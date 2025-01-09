import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

async function handler(req, res) {
  if (req.method === "POST") {
    //TODO: Add serverSide Validation
    const { name, description, id } = JSON.parse(req.body);
    try {
      // Add the new board to Firestore Databse
      const newBoardRef = await addDoc(collection(db, `users/${id}/boards`), {
        name,
        description,
      });
      const newBoardId = newBoardRef.id;

      res.status(201).json({
        success: true,
        message: "Board created successfully",
        boardId: newBoardId,
      });
    } catch (error) {
      console.error("Error creating board:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create board" + error });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  }
}
export default handler;
