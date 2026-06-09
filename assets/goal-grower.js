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

  const cards = document.querySelectorAll(".gg-overlap-card");

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function animateOverlapCards() {
    if (!cards.length) return;

    const isMobile = window.innerWidth < 650;
    const topOffset = isMobile ? 84 : 92;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();

      const raw = (topOffset - rect.top) / (isMobile ? 420 : 500);
      const progress = clamp(raw, 0, 1);

      const readableHold = 0.22;
      const motion = clamp((progress - readableHold) / (1 - readableHold), 0, 1);

      const visibleDeckGap = index * (isMobile ? 22 : 30);
      const lift = motion * (isMobile ? -78 : -110);
      const scale = 1 - motion * 0.022;
      const rotate = motion * (index % 2 === 0 ? -0.18 : 0.18);

      card.style.transform =
        `translateY(${visibleDeckGap + lift}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  }

  window.addEventListener("scroll", animateOverlapCards, { passive: true });
  window.addEventListener("resize", animateOverlapCards);
  animateOverlapCards();
});