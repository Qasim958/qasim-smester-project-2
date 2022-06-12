export const flashAlert = (msg, color) => {
  event.preventDefault();
  const flashAlert = document.querySelector(".flash");
  flashAlert.classList.add("animate--drop-in-fade-out");
  flashAlert.style.backgroundColor = color;
  flashAlert.style.color = "#ffffff";
  document.querySelector(".flash__body").innerHTML = `${msg}`;
  setTimeout(function () {
    document
      .getElementById("flash")
      .classList.remove("animate--drop-in-fade-out");
  }, 2000);
};
