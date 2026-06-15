document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealItems.forEach(item => revealObserver.observe(item));

  const videos = document.querySelectorAll("video[autoplay]");

  videos.forEach(video => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();

    document.addEventListener("scroll", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });
  });

  const thumbsScroller = document.querySelector("[data-product-thumbs]");
  const thumbUp = document.querySelector("[data-thumb-up]");
  const thumbDown = document.querySelector("[data-thumb-down]");

  if (thumbsScroller && thumbUp && thumbDown) {
    thumbUp.addEventListener("click", () => {
      thumbsScroller.scrollBy({
        top: -96,
        left: -96,
        behavior: "smooth"
      });
    });

    thumbDown.addEventListener("click", () => {
      thumbsScroller.scrollBy({
        top: 96,
        left: 96,
        behavior: "smooth"
      });
    });
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});