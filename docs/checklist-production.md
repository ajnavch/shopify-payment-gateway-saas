## Checklist trước khi chạy thật

- [ ] Đã cấu hình đúng biến môi trường `.env` (MongoDB, Shopify, PayPal webhook id)
- [ ] Đã deploy backend lên Vercel, endpoint truy cập public
- [ ] Đã tạo Shopify Custom App, cài đặt OAuth callback
- [ ] Đã thêm ít nhất 1 tài khoản PayPal (qua Admin UI)
- [ ] Đã setup webhook PayPal (PAYMENT.CAPTURE.COMPLETED) trỏ về `/api/paypal/webhook`
- [ ] Đã nhúng SDK vào theme
- [ ] Đã kiểm thử thực tế trên store
- [ ] Đã kiểm tra quota tự reset, pause/resume account, dashboards realtime