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
    { threshold: 0.14 }
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

    if (currentIndex === -1) nextIndex = 0;
    if (nextIndex < 0) nextIndex = thumbArray.length - 1;
    if (nextIndex >= thumbArray.length) nextIndex = 0;

    switchToThumb(thumbArray[nextIndex]);
  }

  function updateThumbArrows() {
  if (!thumbsScroller || !thumbUp || !thumbDown) return;

  const isMobile = window.matchMedia("(max-width: 950px)").matches;

  const needsScroll = isMobile
    ? thumbsScroller.scrollWidth > thumbsScroller.clientWidth + 5
    : thumbsScroller.scrollHeight > thumbsScroller.clientHeight + 5;

  thumbUp.style.display = needsScroll ? "flex" : "none";
  thumbDown.style.display = needsScroll ? "flex" : "none";
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

    updateThumbArrows();

    thumbsScroller.addEventListener("scroll", updateThumbArrows);
    window.addEventListener("resize", updateThumbArrows);
  }

  const productForm = document.querySelector(".gg-product-form");
  const addButton = document.querySelector(".gg-product-add");

  if (productForm && addButton) {
    productForm.addEventListener("submit", async event => {
      const submitter = event.submitter;

      if (!submitter || !submitter.classList.contains("gg-product-add")) {
        return;
      }

      event.preventDefault();

      const originalText = addButton.textContent;
      const formData = new FormData(productForm);

      addButton.disabled = true;
      addButton.textContent = "Adding...";

      try {
        await fetch("/cart/add.js", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        const cartResponse = await fetch("/cart.js");
        const cart = await cartResponse.json();

        document.querySelectorAll(".gg-cart-count").forEach(count => {
          count.textContent = cart.item_count;
        });

addButton.textContent = "Added ✓";

        setTimeout(() => {
          addButton.textContent = originalText.trim() || "Add to Cart";
          addButton.disabled = false;
        }, 1600);
      } catch (error) {
        addButton.textContent = "Try Again";
        addButton.disabled = false;
      }
    });
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});