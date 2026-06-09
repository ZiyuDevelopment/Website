document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".gg-menu-toggle");
  const nav = document.querySelector(".gg-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("gg-open");
    });
  }

  const revealItems = document.querySelectorAll(
    ".gg-story-card, .gg-path-step, .gg-email-card, .gg-store-card, .gg-faq details, .gg-support-list"
  );

  revealItems.forEach((item) => item.classList.add("gg-reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
            entry.target.classList.add("gg-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("gg-visible"));
  }
});