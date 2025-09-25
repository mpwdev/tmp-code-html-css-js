let swiper;

function initSwiper() {
  if (swiper) {
    swiper.destroy(true, true);
  }

  swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      769: {
        slidesPerView: 2,
      },
      1201: {
        slidesPerView: 4,
      },
    },
  });
}

fetch("../categories.json")
  .then((response) => response.json())
  .then((data) => {
    const categories = data.categories;

    const tabsContainer = document.getElementById("tabs-container");

    let buttonsHTML = `<ul class="tabs-list">`;

    buttonsHTML += `<li><button class="tab-button active" data-slug="all">All</button></li>`;

    categories.forEach((category) => {
      buttonsHTML += `
      <li><button class="tab-button" data-slug="${category.slug}">${category.name}</button></li>
      `;
    });

    buttonsHTML += `</ul>`;

    tabsContainer.insertAdjacentHTML("beforeend", buttonsHTML);

    tabsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("tab-button")) {
        const slug = event.target.dataset.slug;

        switchCategory(slug, categories);
      }
    });

    function switchCategory(slug, categories) {
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));

      document
        .querySelector(`.tab-button[data-slug="${slug}"]`)
        .classList.add("active");

      const sliderContainer = document.getElementById("slider-container");
      sliderContainer.innerHTML = "";

      const productsToShow =
        slug === "all"
          ? categories.flatMap((category) => category.products)
          : categories.find((category) => category.slug === slug)?.products ||
            [];

      productsToShow.forEach((product) => {
        sliderContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="swiper-slide">
          <article class="product">
            <div class="product__top">
              <img class="product__image" src="${product.image}" alt="${product.title}">
              <div class="product__percent">-${product.percent}%</div>
            </div>
            <div class="product__bottom">
              <h3 class="product__title"><a class="product__link" href="${product.link}" target="_blank">${product.title}</a></h3>
            </div>
            <p class="product__descr">${product.descr}</p>
            <div class="product__prices">
              <div class="product__price-old">${product.priceOld} $</div>
              <div class="product__price-current">${product.price} $</div>
            </div>
          </article>
        </div>
          `
        );
      });

      initSwiper();
    }

    switchCategory("all", categories);
  })
  .catch((error) => {
    console.log("failed load data from server", error);
  });

// https://youtu.be/mfaY1HFr4I4?t=1565
