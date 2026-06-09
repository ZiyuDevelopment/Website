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

  const overlapCards = document.querySelectorAll(".gg-overlap-card");

  function animateOverlapCards() {
    const topOffset = window.innerWidth < 650 ? 84 : 92;

    overlapCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = Math.min(Math.max((topOffset - rect.top) / 520, 0), 1);

      const scale = 1 - progress * 0.055;
      const lift = progress * -24;
      const rotate = progress * (index % 2 === 0 ? -0.45 : 0.45);
      const opacity = 1 - progress * 0.04;

      card.style.transform = `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg)`;
      card.style.opacity = opacity;
    });
  }

  window.addEventListener("scroll", animateOverlapCards, { passive: true });
  window.addEventListener("resize", animateOverlapCards);
  animateOverlapCards();
});