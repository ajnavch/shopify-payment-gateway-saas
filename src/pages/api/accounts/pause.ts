import { dbConnect } from "../../../lib/db/connect";
import { PaypalAccount } from "../../../lib/db/models";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { accountId, pause } = req.body;
  if (!accountId || pause === undefined) return res.status(400).send("Missing params");
  const status = pause ? "paused" : "active";
  const account = await PaypalAccount.findByIdAndUpdate(accountId, { status }, { new: true });
  res.json({ account });
}