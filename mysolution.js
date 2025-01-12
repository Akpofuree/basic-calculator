const screenDisplay = document.querySelector(".screen");
const button = document.querySelectorAll("button");
let storeValue = [];
let accumulate;
const clearBtn = document.querySelector(".clear");
const calculation = function (button) {
  const values = button.textContent;

  if (values === "=") {
    screenDisplay.textContent = eval(accumulate);
  } else {
    storeValue.push(values);
    accumulate = storeValue.join("");
    screenDisplay.textContent = accumulate;
  }
};

button.forEach((button) =>
  button.addEventListener("click", () => calculation(button))
);

clear.addEventListener("click", function () {
  storeValue = [];
  console.log(`halo`);
  screenDisplay.textContent = ".";
});
