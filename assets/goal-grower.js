document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".gg-menu-toggle");
  const nav = document.querySelector(".gg-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("gg-open");
    });
  }

  const revealItems = document.querySelectorAll(
    ".gg-loop-card, .gg-product-card, .gg-email-card, .gg-fund-card, .gg-faq details, .gg-final, .gg-contact-card, .gg-team-card, .gg-real-product-card, .gg-empty-store"
  );

  revealItems.forEach((item) => item.classList.add("gg-reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(index * 65, 260)}ms`;
          entry.target.classList.add("gg-visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const stackCards = document.querySelectorAll(".gg-sohub-card");
  const phone = document.querySelector(".gg-phone");

  function animateStack() {
    stackCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const topOffset = window.innerWidth < 650 ? 84 : 92;
      const progress = Math.min(Math.max((topOffset - rect.top) / 520, 0), 1);

      const scale = 1 - progress * 0.045;
      const lift = progress * -22;
      const rotate = progress * (index % 2 === 0 ? -0.35 : 0.35);

      card.style.transform = `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg)`;
    });

    if (phone) {
      phone.style.transform = `translateY(${window.scrollY * 0.015}px)`;
    }
  }

  window.addEventListener("scroll", animateStack, { passive: true });
  window.addEventListener("resize", animateStack);
  animateStack();
});