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

  const mainImage = document.querySelector(".gg-product-main-image img");
  const thumbs = document.querySelectorAll("[data-product-image]");
  const thumbsScroller = document.querySelector("[data-product-thumbs]");
  const thumbUp = document.querySelector("[data-thumb-up]");
  const thumbDown = document.querySelector("[data-thumb-down]");

  function switchToThumb(thumb) {
    if (!thumb || !mainImage) return;

    const imageUrl = thumb.dataset.productImage;

    mainImage.src = imageUrl;
    mainImage.srcset = "";
    mainImage.removeAttribute("srcset");
    mainImage.removeAttribute("sizes");

    thumbs.forEach(item => {
      item.classList.remove("is-active");
    });

    thumb.classList.add("is-active");

    thumb.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }

  function moveThumb(direction) {
    const thumbArray = Array.from(thumbs);

    if (!thumbArray.length) return;

    const currentIndex = thumbArray.findIndex(thumb =>
      thumb.classList.contains("is-active")
    );

    let nextIndex = currentIndex + direction;

    if (currentIndex === -1) {
      nextIndex = 0;
    }

    if (nextIndex < 0) {
      nextIndex = thumbArray.length - 1;
    }

    if (nextIndex >= thumbArray.length) {
      nextIndex = 0;
    }

    switchToThumb(thumbArray[nextIndex]);
  }

  thumbs.forEach(thumb => {
    const preload = new Image();
    preload.src = thumb.dataset.productImage;

    thumb.addEventListener("click", () => {
      switchToThumb(thumb);
    });
  });

  if (thumbsScroller && thumbUp && thumbDown) {
    thumbUp.addEventListener("click", () => {
      moveThumb(-1);
    });

    thumbDown.addEventListener("click", () => {
      moveThumb(1);
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