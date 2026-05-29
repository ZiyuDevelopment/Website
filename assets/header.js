document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (!openButton || !closeButton || !mobileMenu) return;

  openButton.addEventListener("click", () => {
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });
});