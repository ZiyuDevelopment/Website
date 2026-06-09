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

  const featureCards = document.querySelectorAll(".gg-feature-card");
  const labCard = document.querySelector(".gg-lab-card-main");

  function animateCards() {
    const topOffset = window.innerWidth < 650 ? 84 : 92;

    featureCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = Math.min(Math.max((topOffset - rect.top) / 560, 0), 1);

      const scale = 1 - progress * 0.055;
      const lift = progress * -26;
      const rotate = progress * (index % 2 === 0 ? -0.35 : 0.35);

      card.style.transform = `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg)`;
    });

    if (labCard) {
      labCard.style.transform = `translateY(${window.scrollY * 0.012}px)`;
    }
  }

  window.addEventListener("scroll", animateCards, { passive: true });
  window.addEventListener("resize", animateCards);
  animateCards();
});