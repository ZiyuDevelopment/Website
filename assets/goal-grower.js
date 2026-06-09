document.addEventListener("DOMContentLoaded", () => {

  // Mobile Menu
  const menuToggle = document.querySelector(".gg-menu-toggle");
  const nav = document.querySelector(".gg-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("gg-open");
    });
  }

  // Reveal Animations
  const revealItems = document.querySelectorAll(
    ".gg-loop-card, .gg-product-card, .gg-email-card, .gg-fund-card, .gg-faq details, .gg-contact-card, .gg-team-card, .gg-real-product-card, .gg-human-card"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("gg-visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("gg-reveal");
    revealObserver.observe(item);
  });

});