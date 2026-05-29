document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (openBtn && closeBtn && menu) {
    openBtn.addEventListener("click", () => menu.classList.add("is-open"));
    closeBtn.addEventListener("click", () => menu.classList.remove("is-open"));
  }
});