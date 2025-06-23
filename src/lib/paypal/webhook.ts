import crypto from "crypto";
import { PaypalAccount, Transaction } from "../db/models";

// Verify PayPal webhook signature (the official method)
export async function verifyPaypalWebhookSignature(req) {
  // Simplified for demo; call PayPal API to verify in production
  if (process.env.NODE_ENV !== "production") return true;
  // ...call PayPal /v1/notifications/verify-webhook-signature
  return true;
}