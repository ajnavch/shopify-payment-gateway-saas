import { dbConnect } from "../../../lib/db/connect";
import { PaypalAccount } from "../../../lib/db/models";

export default async function handler(req, res) {
  await dbConnect();
  // TODO: Lấy storeId từ session hoặc query
  const storeId = req.query.storeId || "demo-store-id";
  const accounts = await PaypalAccount.find({ storeId });
  res.json({ accounts });
}