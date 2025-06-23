# Shopify Payment Gateway SaaS – Multi PayPal Rotator

## I. Cài đặt & phát triển

1. Clone repo, cài package:
    ```bash
    git clone <repo>
    cd shopify-payment-gateway-saas
    cp .env.example .env
    npm install
    npm run dev
    ```
2. Tạo MongoDB Atlas Cluster, điền MONGODB_URI trong .env.

3. Đăng ký Shopify Partner App, điền SHOPIFY_API_KEY/SECRET.

4. Deploy lên Vercel khi hoàn thiện.

## II. Luồng vận hành

- App OAuth theo chuẩn Shopify 2025.
- Admin UI embedded với Polaris: quản lý PayPal accounts, quota, dashboard.
- SDK JS nhúng vào Shopify theme, inject PayPal Button.
- API backend: chọn PayPal account theo quota, tạo/capture order, update realtime.
- Webhook PayPal cập nhật trạng thái giao dịch.

## III. Video Demo

(Đính kèm video sau khi hoàn tất triển khai)