document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!openBtn || !closeBtn || !menu) return;

  function openMenu() {
    menu.classList.add("is-open");
    document.body.classList.add("zd-menu-open");
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    document.body.classList.remove("zd-menu-open");
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});