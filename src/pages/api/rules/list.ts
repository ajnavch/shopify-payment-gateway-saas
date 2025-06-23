import { dbConnect } from "../../../lib/db/connect";
import { Rule } from "../../../lib/db/models";
export default async function handler(req, res) {
  await dbConnect();
  const { storeId } = req.query;
  const rules = await Rule.find({ storeId });
  res.json({ rules });
}