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

  const scrollArea = document.querySelector(".gg-overlap-scroll");
  const cards = Array.from(document.querySelectorAll(".gg-overlap-card"));

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function animateOverlapCards() {
    if (!scrollArea || cards.length === 0) return;

    const rect = scrollArea.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = clamp(-rect.top, 0, total);
    const progress = total > 0 ? scrolled / total : 0;

    const isMobile = window.innerWidth < 650;
    const startGap = isMobile ? 96 : 132;
    const stackGap = isMobile ? 24 : 34;
    const segment = 1 / cards.length;

    cards.forEach((card, index) => {
      const cardStart = index * segment;
      const cardProgress = clamp((progress - cardStart) / segment, 0, 1);

      const startY = index * startGap;
      const endY = index * stackGap;

      const y = startY + (endY - startY) * cardProgress;
      const scale = 1 - cardProgress * 0.025;
      const rotate = cardProgress * (index % 2 === 0 ? -0.2 : 0.2);

      card.style.transform = `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  }

  window.addEventListener("scroll", animateOverlapCards, { passive: true });
  window.addEventListener("resize", animateOverlapCards);
  animateOverlapCards();
});