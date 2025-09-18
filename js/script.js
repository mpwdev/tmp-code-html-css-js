const input = document.querySelector(".file-upload__input");
const label = document.querySelector(".file-upload__label");

input.addEventListener("change", () => {
  label.textContent = input.files.length > 0 ? [...input.files].map(file => file.name).join(", ") : "File is not chosen";
});
