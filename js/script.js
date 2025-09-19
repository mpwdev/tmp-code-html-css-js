const progressBars = document.querySelectorAll(".progress-bar");

progressBars.forEach((el) => {
  const value = +el.dataset.value;

  el.style.setProperty("--progress", `${value}%`);
});

// var2

const progressRings = document.querySelectorAll(".progress-ring");

progressRings.forEach((el) => {
  const value = +el.dataset.value;
  const circle = el.querySelector(".progress-ring__value");
  const radius = circle.r.baseVal.value;

  const circleLength = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circleLength;
  circle.style.strokeDashoffset = circleLength * (1 - value / 100);
});
