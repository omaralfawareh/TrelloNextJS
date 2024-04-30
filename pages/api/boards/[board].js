import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Assuming db is the Firestore instance

async function handler(req, res) {
  const boardID = req.query;
  if (req.method === "POST") {
    //Add serverSide Validation
    const { name, description } = JSON.parse(req.body);
    console.log("data ==> ", name, "||", description);
    try {
      // Add the new board to Firestore
      const newBoardRef = await addDoc(
        collection(db, `users/5sn3Mhkrold8DXjKaD3oKNhBW6g2/boards`),
        { name, description },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyMzhkZDA0Y2JhYTU4MGIzMDRjODgxZTFjMDA4ZWMyOGZiYmFkZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiT21hciBBbGZhd2FyZWgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmV6QUozY2xCLU1GUm1rRUZBWGRpVnJMbEhsSExKOTFLUE5NcUh1a3V0cm1WTD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90cmVsbG9uZXh0anMiLCJhdWQiOiJ0cmVsbG9uZXh0anMiLCJhdXRoX3RpbWUiOjE3MTQ1MTIyODMsInVzZXJfaWQiOiI1c24zTWhrcm9sZDhEWGpLYUQzb0tOaEJXNmcyIiwic3ViIjoiNXNuM01oa3JvbGQ4RFhqS2FEM29LTmhCVzZnMiIsImlhdCI6MTcxNDUxMjI4MywiZXhwIjoxNzE0NTE1ODgzLCJlbWFpbCI6ImFsZmF3YXJlaG9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTczMzY3ODYxNzA2NzM1ODU4NzMiXSwiZW1haWwiOlsiYWxmYXdhcmVob0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.o-iujzk4f3VAm9ajBlP-5W0btc9SsYVltDNbhLVB9jrsvkJUXS0olWDsk2zS63HCtWXazEMVwUzpIiU4izoG6Hld-8n1LW_3mz0KP6wMGr2Il7Hdu26xzOhwIxJ8f2TVW5UwKD9RhOZ4Tuza6PXJOY_7PIqwtgviIt4_4IcKrtST1NdtDE2cS3st_bzEdS-mQr8vlENzKhjzJDBEoo16XG-lwo9jBbKwwo0wrncbbXrA4ORKZL2_3FZdSUXlmU5nNZn5ZbEgv1OCJA_pjCFs6HMVav67NWq-lfIEWKYCugpbfZO19DgoktIIZe4Hl9cXy8DAWtxfsqsj-uMl_J2nWw`,
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

  if (req.method === "GET") {
  }
}
export default handler;
