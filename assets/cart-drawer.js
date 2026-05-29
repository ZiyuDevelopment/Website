document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.querySelector("[data-cart-drawer]");
  const body = document.querySelector("[data-cart-drawer-body]");
  const subtotal = document.querySelector("[data-cart-subtotal]");
  const closeButtons = document.querySelectorAll("[data-cart-close]");
  const cartLinks = document.querySelectorAll('a[href="/cart"]');

  if (!drawer) return;

  function openCart() {
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeCart);
  });

  cartLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openCart();
    });
  });

  document.addEventListener("submit", async (event) => {
    const form = event.target;

    if (!form.matches('form[action*="/cart/add"]')) return;

    event.preventDefault();

    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.textContent = "Adding...";

    try {
      const formData = new FormData(form);

      await fetch("/cart/add.js", {
        method: "POST",
        body: formData
      });

      const cart = await fetch("/cart.js").then((res) => res.json());

      if (subtotal) {
        subtotal.textContent = Shopify.formatMoney(cart.total_price);
      }

      if (body) {
        body.innerHTML = cart.items.length
          ? cart.items.map((item) => `
            <div class="zd-cart-drawer__item">
              <img src="${item.image}" alt="${item.product_title}">
              <div>
                <h3>${item.product_title}</h3>
                <p>${item.quantity} × ${Shopify.formatMoney(item.final_price)}</p>
              </div>
            </div>
          `).join("")
          : `
            <div class="zd-cart-drawer__empty">
              <h3>Your cart is empty.</h3>
              <p>Explore curated tools for focus, growth, and intentional living.</p>
            </div>
          `;
      }

      openCart();
    } catch (error) {
      console.error("Cart error:", error);
      window.location.href = "/cart";
    } finally {
      if (submitButton) submitButton.textContent = "Add to Cart";
    }
  });
});