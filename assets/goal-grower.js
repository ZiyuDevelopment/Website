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

  const variantsElement = document.querySelector("[data-product-json]");
  const variantInput = document.querySelector("[data-variant-id]");
  const price = document.querySelector("[data-product-price]");
  const addButton = document.querySelector(".gg-product-add");
  const optionGroups = document.querySelectorAll("[data-option-group]");

  const variants = variantsElement ? JSON.parse(variantsElement.textContent) : [];

  function formatMoney(cents) {
    return "$" + (cents / 100).toFixed(2);
  }

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

    if (thumbsScroller) {
      const thumbTop = thumb.offsetTop;
      const thumbBottom = thumbTop + thumb.offsetHeight;

      const viewTop = thumbsScroller.scrollTop;
      const viewBottom = viewTop + thumbsScroller.clientHeight;

      if (thumbTop < viewTop) {
        thumbsScroller.scrollTo({
          top: thumbTop,
          behavior: "smooth"
        });
      } else if (thumbBottom > viewBottom) {
        thumbsScroller.scrollTo({
          top: thumbBottom - thumbsScroller.clientHeight,
          behavior: "smooth"
        });
      }
    }
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

  function getSelectedOptions() {
    return Array.from(optionGroups).map(group => {
      const active = group.querySelector(".gg-option-button.is-active");
      return active ? active.dataset.optionValue : "";
    });
  }

  function findVariant() {
    const selectedOptions = getSelectedOptions();

    return variants.find(variant => {
      return variant.options.every((option, index) => {
        return option === selectedOptions[index];
      });
    });
  }

  function activateVariantImage(variant) {
    if (!variant || !variant.featured_image || !variant.featured_image.src || !mainImage) {
      return;
    }

    const imageUrl = variant.featured_image.src;

    mainImage.src = imageUrl;
    mainImage.srcset = "";
    mainImage.removeAttribute("srcset");
    mainImage.removeAttribute("sizes");

    thumbs.forEach(thumb => {
      thumb.classList.remove("is-active");

      const thumbImage = thumb.dataset.productImage || "";

      if (
        thumbImage.includes(imageUrl.split("?")[0]) ||
        imageUrl.includes(thumbImage.split("?")[0])
      ) {
        thumb.classList.add("is-active");
      }
    });
  }

  function updateVariant() {
    if (!optionGroups.length || !variantInput) return;

    const variant = findVariant();

    if (!variant) {
      if (addButton) {
        addButton.disabled = true;
        addButton.textContent = "Unavailable";
      }
      return;
    }

    variantInput.value = variant.id;

    activateVariantImage(variant);

    if (price) {
      price.textContent = formatMoney(variant.price);
    }

    if (addButton) {
      if (variant.available) {
        addButton.disabled = false;
        addButton.textContent = "Add to Cart";
      } else {
        addButton.disabled = true;
        addButton.textContent = "Sold Out";
      }
    }
  }

  optionGroups.forEach(group => {
    const buttons = group.querySelectorAll(".gg-option-button");
    const selectedText = group.querySelector("[data-option-selected]");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("is-active"));
        button.classList.add("is-active");

        if (selectedText) {
          selectedText.textContent = button.dataset.optionValue;
        }

        updateVariant();
      });
    });
  });

  const quantityInput = document.querySelector("[data-product-quantity]");
  const minusButton = document.querySelector("[data-product-minus]");
  const plusButton = document.querySelector("[data-product-plus]");

  if (minusButton && quantityInput) {
    minusButton.addEventListener("click", () => {
      const value = parseInt(quantityInput.value || 1, 10);
      quantityInput.value = Math.max(1, value - 1);
    });
  }

  if (plusButton && quantityInput) {
    plusButton.addEventListener("click", () => {
      const value = parseInt(quantityInput.value || 1, 10);
      quantityInput.value = value + 1;
    });
  }

  const productForm = document.querySelector(".gg-product-form");

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