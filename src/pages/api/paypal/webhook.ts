import { verifyPaypalWebhookSignature } from "../../../lib/paypal/webhook";
import { Transaction } from "../../../lib/db/models";
import { dbConnect } from "../../../lib/db/connect";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const isValid = await verifyPaypalWebhookSignature(req);
  if (!isValid) return res.status(400).send("Invalid signature");

  const event = req.body;
  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const captureId = event.resource.id;
    await Transaction.updateOne(
      { captureId: captureId },
      { status: "completed", raw: event.resource }
    );
  }
  res.status(200).send("OK");
}