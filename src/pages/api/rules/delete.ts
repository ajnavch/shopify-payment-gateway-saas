import { dbConnect } from "../../../lib/db/connect";
import { Rule } from "../../../lib/db/models";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { ruleId } = req.body;
  if (!ruleId) return res.status(400).send("Missing params");
  await Rule.findByIdAndDelete(ruleId);
  res.json({ ok: true });
}