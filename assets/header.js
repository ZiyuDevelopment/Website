document.addEventListener("DOMContentLoaded", () => {
  const open = document.querySelector("[data-menu-open]");
  const close = document.querySelector("[data-menu-close]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!open || !close || !menu) return;

  open.addEventListener("click", () => {
    menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", () => {
    menu.classList.remove("is-open");
    document.body.style.overflow = "";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });
});