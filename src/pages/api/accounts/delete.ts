import { dbConnect } from "../../../lib/db/connect";
import { PaypalAccount } from "../../../lib/db/models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { accountId } = req.body;
  if (!accountId) return res.status(400).send("Missing params");
  await PaypalAccount.findByIdAndDelete(accountId);
  res.json({ ok: true });
}