// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from "firebase/auth";
export default function handler(req, res) {
  const user = getAuth();
  console.log("USER ==> ", user.currentUser);
  res.status(200).json({ name: "John Doe" });
}
