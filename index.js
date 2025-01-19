// more complicated with catching more errors
const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const clear = document.querySelector("#clear");

let storer = [];
let accumulate;
const mainFunction = function (button) {
  const value = button.textContent;
  const operators = ["+", "-", "*", "/"];

  const checkForErrors = () => {
    if (storer.length === 0 && operators.includes(value)) {
      throw new Error("Invalid Input");
    }

    // Prevent two consecutive operators
    const lastChar = storer[storer.length - 1];
    if (operators.includes(lastChar) && operators.includes(value)) {
      throw new Error("Invalid Input"); // Consecutive operators
    }

    // Prevent multiple decimal points in a number
    if (value === "." && storer[storer.length - 1] === ".") {
      throw new Error("Invalid Input"); // Multiple decimal points
    }

    // Check for division by zero
    if (
      value === "0" &&
      storer.includes("/") &&
      !isNaN(storer[storer.length - 1])
    ) {
      throw new Error("Cannot divide by zero"); // Division by zero
    }
  };

  try {
    // Check for errors before adding to storer
    checkForErrors();

    // Handle "=" button click (evaluate expression)
    if (value === "=") {
      try {
        screenDisplay.textContent = eval(accumulate); // Evaluate the expression
      } catch (error) {
        throw new Error("Invalid Expression");
      }
    } else {
      storer.push(value);
      accumulate = storer.join("");
      screenDisplay.textContent = accumulate;
    }
  } catch (error) {
    // Catch any error (either from checkForErrors or eval) and display the error message
    screenDisplay.textContent = " Syntax Error"; // Display a generic error message
    storer = []; // Optionally clear the input so the user can start fresh
  }
};

buttons.forEach((button) =>
  button.addEventListener("click", () => mainFunction(button))
);

clear.addEventListener("click", () => {
  storer = [];
  screenDisplay.textContent = ".";
});
