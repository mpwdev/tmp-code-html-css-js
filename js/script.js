document.addEventListener("DOMContentLoaded", () => {
  const menuBtns = document.querySelectorAll(".menu__btn");
  const drops = document.querySelectorAll(".dropdown");

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let currentBtn = e.currentTarget;
      let drop = currentBtn.closest(".menu__item").querySelector(".dropdown");

      menuBtns.forEach((btn) => {
        if (btn !== currentBtn) {
          btn.classList.remove("menu__btn--active");
        }
      });

      drops.forEach((item) => {
        if (item !== drop) {
          item.classList.remove("dropdown--active");
        }
      });

      drop.classList.toggle("dropdown--active");
      currentBtn.classList.toggle("menu__btn--active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu")) {
      menuBtns.forEach((btn) => {
        btn.classList.remove("menu__btn--active");
      });

      drops.forEach((item) => {
        item.classList.remove("dropdown--active");
      });
    }
  });
});
