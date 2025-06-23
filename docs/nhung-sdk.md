## Nhúng SDK vào Shopify Theme

1. Vào Admin Shopify > Online Store > Themes > Edit code.
2. Tại file theme.liquid hoặc product.liquid, trước thẻ `</body>`, chèn:
   ```html
   <script src="https://your-vercel-app.vercel.app/sdk/paypal-sdk.js"></script>
   ```
3. Lưu lại, PayPal button sẽ tự động xuất hiện ở product page/cart.