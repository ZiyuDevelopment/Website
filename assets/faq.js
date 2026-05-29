document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".zd-faq-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.nextElementSibling;
      const icon = item.querySelector("strong");

      if (!answer) return;

      answer.classList.toggle("is-open");

      if (icon) {
        icon.textContent = answer.classList.contains("is-open") ? "−" : "+";
      }
    });
  });
});