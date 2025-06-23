import fetch from "node-fetch";

export async function getPaypalAccessToken(clientId: string, clientSecret: string) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  if (!res.ok) throw new Error("Failed to get PayPal access token");
  const { access_token } = await res.json();
  return access_token;
}

export async function createPaypalOrder(accessToken: string, data: any) {
  const res = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create PayPal order");
  return res.json();
}

export async function capturePaypalOrder(accessToken: string, orderId: string) {
  const res = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error("Failed to capture PayPal order");
  return res.json();
}