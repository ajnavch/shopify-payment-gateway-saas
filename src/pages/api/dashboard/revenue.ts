import { dbConnect } from "../../../lib/db/connect";
import { Transaction, PaypalAccount } from "../../../lib/db/models";
export default async function handler(req, res) {
  await dbConnect();
  const { storeId } = req.query;
  const transactions = await Transaction.find({ storeId, status: "COMPLETED" });
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const byAccount = {};
  for (const t of transactions) {
    byAccount[t.paypalAccountId] = (byAccount[t.paypalAccountId] || 0) + t.amount;
  }
  const accounts = await PaypalAccount.find({ storeId });
  res.json({
    totalRevenue, byAccount, accounts: accounts.map(acc => ({
      id: acc._id, clientId: acc.clientId, quota: acc.quota, todayReceived: acc.todayReceived, status: acc.status
    }))
  });
}