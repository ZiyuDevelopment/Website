document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".zd-roadmap-tabs button");
  const items = document.querySelectorAll(".zd-roadmap-item");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      buttons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      items.forEach((item) => {
        if (filter === "all" || item.dataset.phase === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});