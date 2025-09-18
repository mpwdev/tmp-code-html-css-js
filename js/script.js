const data = [
  {
    id: "supermarkets",
    label: "Supermarkets",
    value: 2463,
    color: "#ff6b81",
  },
  {
    id: "fastfood",
    label: "Fast Food",
    value: 1353,
    color: "#ffa07a",
  },
  {
    id: "carsharing",
    label: "Car Sharing",
    value: 1500,
    color: "#ffb84d",
  },
  {
    id: "transfers",
    label: "Transfers",
    value: 580,
    color: "#5ac8fa",
  },
  {
    id: "mobile",
    label: "Mobile",
    value: 550,
    color: "#7b68ee",
  },
];

const centerText = document.getElementById("centerText");
const categoriesEl = document.getElementById("categories");
const chartEl = document.getElementById("chart");
const baseCircle = document.getElementById("baseCircle");
const total = data.reduce((sum, item) => sum + item.value, 0);

const radius = parseFloat(baseCircle.getAttribute("r"));
const cx = baseCircle.getAttribute("cx");
const cy = baseCircle.getAttribute("cy");
const circleLength = 2 * Math.PI * radius;

const setDefaultText = () => {
  centerText.innerHTML = `$ ${total} <span>Spent</span>`;
};

setDefaultText();

let offset = 0;

data.forEach((item) => {
  categoriesEl.insertAdjacentHTML(
    "beforeend",
    `<div class="category" data-id="${item.id}" style="--color: ${item.color}">
      ${item.label} $${item.value}
    </div>`
  );

  const cat = categoriesEl.querySelector(`.category[data-id="${item.id}"]`);

  const fraction = item.value / total;
  const dash = fraction * circleLength;
  const gap = circleLength - dash;

  chartEl.insertAdjacentHTML(
    "beforeend",
    `<circle class="slice" data-id="${
      item.id
    }" r="${radius}" cx="${cx}" cy="${cy}" fill="none" style="--color: ${
      item.color
    }" stroke="${
      item.color
    }" stroke-width="20" stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}"></circle>`
  );

  const slice = chartEl.querySelector(`.slice[data-id="${item.id}"]`);

  offset += dash;

  const showCategoryText = () => {
    centerText.innerHTML = `$ ${item.value} <span>${item.label}</span>`;
  };

  const resetText = () => setDefaultText();

  cat.addEventListener("mouseenter", () => {
    slice.classList.add("slice--active");
    showCategoryText();
  });

  cat.addEventListener("mouseleave", () => {
    slice.classList.remove("slice--active");
    resetText();
  });

  slice.addEventListener("mouseenter", () => {
    slice.classList.add("slice--active");
    cat.classList.add("category--active");
    showCategoryText();
  });

  slice.addEventListener("mouseleave", () => {
    slice.classList.remove("slice--active");
    cat.classList.remove("category--active");
    resetText();
  });
});
