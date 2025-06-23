import { dbConnect } from "../../../lib/db/connect";
import { Rule } from "../../../lib/db/models";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { storeId, type, country, formula } = req.body;
  if (!storeId || !type || !formula) return res.status(400).send("Missing params");
  const rule = await Rule.create({ storeId, type, country, formula });
  res.json({ rule });
}