import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

async function handler(req, res) {
  // const boardID = req.query;
  if (req.method === "POST") {
    //Add serverSide Validation
    const { name, description } = JSON.parse(req.body);
    // console.log("Req  ==> ", req.headers.authorization);
    // console.log("data ==> ", name, "||", description);
    try {
      // Add the new board to Firestore
      const newBoardRef = await addDoc(
        collection(db, `users/5sn3Mhkrold8DXjKaD3oKNhBW6g2/boards`),
        { name, description },
        {
          headers: {
            Authorization: ``,
          },
        } // Include the authentication token in the request headers
      );
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
  }

  // if (req.method === "GET") {
  // }
}
export default handler;
