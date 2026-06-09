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

  const story = document.querySelector(".gg-overlap-story");
  const stage = document.querySelector(".gg-overlap-stage");
  const cards = document.querySelectorAll(".gg-overlap-card");

  function animateOverlapCards() {
    if (!story || !stage || !cards.length) return;

    const isMobile = window.innerWidth < 650;
    const stickyTop = isMobile ? 84 : 92;

    const storyRect = story.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    const totalScroll = stage.offsetHeight - window.innerHeight;
    const currentScroll = Math.min(
      Math.max(-stageRect.top + stickyTop, 0),
      totalScroll
    );

    const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
    const cardCount = cards.length;

    cards.forEach((card, index) => {
      const start = index / cardCount;
      const end = (index + 1) / cardCount;
      const local = Math.min(Math.max((progress - start) / (end - start), 0), 1);

      const stackOffset = index * (isMobile ? 14 : 18);
      const compress = local * (isMobile ? 42 : 56);
      const scale = 1 - local * 0.045;
      const rotate = local * (index % 2 === 0 ? -0.35 : 0.35);

      if (index === 0) {
        card.style.transform = `translateY(${local * -18}px) scale(${scale}) rotate(${rotate}deg)`;
      } else {
        const pullUp = local * -(isMobile ? 56 : 72);
        card.style.transform = `translateY(${pullUp - stackOffset - compress}px) scale(${scale}) rotate(${rotate}deg)`;
      }
    });
  }

  window.addEventListener("scroll", animateOverlapCards, { passive: true });
  window.addEventListener("resize", animateOverlapCards);
  animateOverlapCards();
});