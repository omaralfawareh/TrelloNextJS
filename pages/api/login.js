export default function hander(req, res) {
  const data = JSON.parse(req.body);
  if (req.method === "POST") {
    console.log(data);
  }
  res.status(200).json({ data: data });
}
