import { dbConnect } from "../../../lib/db/connect";
import { PaypalAccount } from "../../../lib/db/models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { accountId, quota } = req.body;
  if (!accountId || quota === undefined) return res.status(400).send("Missing params");
  const update = {};
  if (quota !== undefined) update["quota"] = quota;
  const account = await PaypalAccount.findByIdAndUpdate(accountId, update, { new: true });
  res.json({ account });
}