(function(){
  async function getCartData() {
    // Lấy cart data, tuỳ theme
    return {
      storeId: window.Shopify?.shop || "demo-store-id",
      amount: window.cart?.total_price ? window.cart.total_price / 100 : 10,
      currency: window.cart?.currency || "USD",
      items: window.cart?.items || []
    };
  }
  async function createOrder(cart) {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart)
    });
    return res.json();
  }
  function injectButton() {
    const target = document.querySelector(".product-form") || document.body;
    if (!target || target.querySelector(".paypal-custom-btn")) return;
    const btn = document.createElement("button");
    btn.innerText = "Buy Now with PayPal";
    btn.className = "paypal-custom-btn";
    btn.style.background = "#ffc439";
    btn.style.color = "#111";
    btn.style.padding = "12px 30px";
    btn.style.fontWeight = "bold";
    btn.onclick = async function () {
      btn.disabled = true; btn.innerText = "Processing...";
      const cart = await getCartData();
      const { orderId, capture } = await createOrder(cart);
      if(orderId) window.location.href = `https://www.paypal.com/checkoutnow?token=${orderId}`;
      else { btn.disabled = false; btn.innerText = "Buy Now with PayPal"; alert("Đặt hàng thất bại!"); }
    };
    target.appendChild(btn);
  }
  document.addEventListener("DOMContentLoaded", injectButton);
})();