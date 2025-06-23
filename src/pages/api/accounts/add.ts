import { dbConnect } from "../../../lib/db/connect";
import { PaypalAccount } from "../../../lib/db/models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { storeId, clientId, clientSecret, quota } = req.body;
  if (!storeId || !clientId || !clientSecret || !quota) return res.status(400).send("Missing params");
  const account = await PaypalAccount.create({
    storeId, clientId, clientSecret, quota,
    todayReceived: 0, lastReset: new Date(), status: "active"
  });
  res.json({ account });
}