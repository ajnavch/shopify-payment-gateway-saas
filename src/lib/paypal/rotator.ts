import { PaypalAccount } from "../db/models";

// Reset quota nếu sang ngày mới
export async function resetPaypalQuotaIfNeeded(account) {
  const now = new Date();
  if (now.getUTCDate() !== new Date(account.lastReset).getUTCDate()) {
    account.todayReceived = 0;
    account.lastReset = now;
    await account.save();
  }
}

// Lấy account còn quota, round robin theo thứ tự tạo
export async function selectPaypalAccount(storeId: string, amount: number) {
  const accounts = await PaypalAccount.find({ storeId, status: "active" }).sort({ createdAt: 1 });
  for (const acc of accounts) {
    await resetPaypalQuotaIfNeeded(acc);
    if ((acc.todayReceived + amount) <= acc.quota) {
      return acc;
    }
  }
  throw new Error("All PayPal accounts exceeded daily quota or paused.");
}