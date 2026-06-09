document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".gg-menu-toggle");
  const nav = document.querySelector(".gg-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("gg-open");
    });
  }

  const revealItems = document.querySelectorAll(
    ".gg-loop-card, .gg-product-card, .gg-email-card, .gg-fund-card, .gg-faq details, .gg-contact-card, .gg-team-card, .gg-real-product-card, .gg-human-card"
  );

  revealItems.forEach((item) => item.classList.add("gg-reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
            entry.target.classList.add("gg-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("gg-visible"));
  }
});