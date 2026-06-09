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

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
          entry.target.classList.add("gg-visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const stage = document.querySelector(".gg-overlap-stage");
  const cards = document.querySelectorAll(".gg-overlap-card");

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function animateOverlapCards() {
    if (!stage || !cards.length) return;

    const isMobile = window.innerWidth < 650;
    const cardGap = isMobile ? 92 : 130;
    const visibleStackGap = isMobile ? 28 : 38;

    const rect = stage.getBoundingClientRect();
    const stageTop = window.scrollY + rect.top;
    const scrollInside = clamp(window.scrollY - stageTop, 0, stage.offsetHeight - window.innerHeight);

    cards.forEach((card, index) => {
      const startY = index * cardGap;
      const trigger = index * (isMobile ? 360 : 430);
      const local = clamp((scrollInside - trigger) / (isMobile ? 420 : 520), 0, 1);

      const targetY = index * visibleStackGap;
      const y = startY + (targetY - startY) * local;

      const scale = 1 - local * 0.025;
      const rotate = local * (index % 2 === 0 ? -0.18 : 0.18);

      card.style.transform = `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  }

  window.addEventListener("scroll", animateOverlapCards, { passive: true });
  window.addEventListener("resize", animateOverlapCards);
  animateOverlapCards();
});