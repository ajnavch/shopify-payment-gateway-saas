import type { NextApiRequest, NextApiResponse } from "next";
import { shopifyOAuthHandler } from "../../../lib/shopify/oauth2025";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await shopifyOAuthHandler(req, res);
}