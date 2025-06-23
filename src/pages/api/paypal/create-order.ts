import { dbConnect } from "../../../lib/db/connect";
import { selectPaypalAccount } from "../../../lib/paypal/rotator";
import { getPaypalAccessToken, createPaypalOrder, capturePaypalOrder } from "../../../lib/paypal/rest";
import { Transaction } from "../../../lib/db/models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { storeId, amount, currency, items } = req.body;
  if (!storeId || !amount || !currency) return res.status(400).send("Missing params");

  try {
    const account = await selectPaypalAccount(storeId, amount);
    const accessToken = await getPaypalAccessToken(account.clientId, account.clientSecret);

    // Create order (PayPal REST API v2)
    const order = await createPaypalOrder(accessToken, {
      intent: "AUTHORIZE",
      purchase_units: [{
        amount: { currency_code: currency, value: amount.toString() },
        items: items || []
      }]
    });

    // PayPal orderId
    const authorizationId = order.id;
    
    // Capture immediately (as per flow)
    const captured = await capturePaypalOrder(accessToken, authorizationId);

    // Update quota in realtime
    account.todayReceived += parseFloat(amount);
    await account.save();

    // Save transaction
    await Transaction.create({
      storeId,
      paypalAccountId: account._id,
      authorizationId,
      captureId: captured.purchase_units[0]?.payments?.captures[0]?.id,
      amount,
      currency,
      status: captured.status,
      raw: captured
    });

    res.json({ orderId: authorizationId, capture: captured });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}