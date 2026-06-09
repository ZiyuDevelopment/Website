document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".gg-menu-toggle");
  const nav = document.querySelector(".gg-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("gg-open");
    });
  }

  const cards = document.querySelectorAll(".gg-overlap-card");

  function animateOverlapCards() {
    const topOffset = window.innerWidth < 650 ? 84 : 92;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = Math.min(Math.max((topOffset - rect.top) / 420, 0), 1);

      const visibleTop = index * (window.innerWidth < 650 ? 22 : 30);
      const lift = progress * -110;
      const scale = 1 - progress * 0.025;
      const rotate = progress * (index % 2 === 0 ? -0.25 : 0.25);

      card.style.transform = `translateY(${visibleTop + lift}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  }

  window.addEventListener("scroll", animateOverlapCards, { passive: true });
  window.addEventListener("resize", animateOverlapCards);
  animateOverlapCards();
});