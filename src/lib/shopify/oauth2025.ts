import type { NextApiRequest, NextApiResponse } from 'next';
import { Store } from '../db/models';
import { dbConnect } from '../db/connect';
import crypto from 'crypto';

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY!;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET!;
const SHOPIFY_APP_URL = process.env.SHOPIFY_APP_URL!;

function buildInstallUrl(shop: string, state: string) {
  const redirectUri = encodeURIComponent(`${SHOPIFY_APP_URL}/api/auth/callback`);
  const scopes = process.env.SHOPIFY_SCOPES || "read_orders,write_payment_gateways";
  return `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}`;
}

export async function shopifyOAuthHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === "GET") {
    const { shop, code, state } = req.query;
    if (!shop) return res.status(400).send("Missing shop param");
    if (!code) {
      // Start OAuth
      const stateParam = crypto.randomBytes(8).toString("hex");
      res.redirect(buildInstallUrl(shop as string, stateParam));
    } else {
      // Callback, get access token
      const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: SHOPIFY_API_KEY,
          client_secret: SHOPIFY_API_SECRET,
          code,
        })
      });
      if (!tokenRes.ok) return res.status(400).send("Failed to get access token");
      const { access_token } = await tokenRes.json();
      // Save store info
      await Store.updateOne(
        { shop },
        { shop, accessToken: access_token },
        { upsert: true }
      );
      // Redirect to embedded Admin UI
      res.redirect(`/admin?shop=${shop}`);
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}