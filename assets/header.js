document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!openBtn || !closeBtn || !menu) {
    console.warn("Mobile menu elements missing");
    return;
  }

  const openMenu = () => {
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});