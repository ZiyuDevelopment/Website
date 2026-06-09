console.log("Goal Grower JS loaded");

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".gg-menu-toggle");
  const nav = document.querySelector(".gg-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("gg-open");
    });
  }

  const servicePin = document.querySelector(".gg-service-pin");
  const serviceCards = Array.from(document.querySelectorAll(".gg-service-card"));

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function animateServiceCards() {
    if (!servicePin || !serviceCards.length) return;

    const isMobile = window.innerWidth < 750;
    const pinRect = servicePin.getBoundingClientRect();

    const totalScroll = servicePin.offsetHeight - window.innerHeight;
    const currentScroll = clamp(-pinRect.top, 0, totalScroll);
    const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;

    const cardCount = serviceCards.length;
    const segment = 1 / cardCount;

    serviceCards.forEach((card, index) => {
      const localStart = index * segment;
      const localEnd = (index + 1) * segment;
      const localProgress = clamp(
        (progress - localStart) / (localEnd - localStart),
        0,
        1
      );

      const startY = index * (isMobile ? 120 : 170);
      const endY = index * (isMobile ? 42 : 58);

      const y = startY + (endY - startY) * localProgress;
      const scale = 1 - localProgress * 0.018;

      card.style.transform = `translateY(${y}px) scale(${scale})`;

      if (localProgress > 0.72) {
        card.classList.add("is-stacked");
      } else {
        card.classList.remove("is-stacked");
      }
    });
  }

  window.addEventListener("scroll", animateServiceCards, { passive: true });
  window.addEventListener("resize", animateServiceCards);
  animateServiceCards();

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