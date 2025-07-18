import { executeComplexExpression } from "./executeExpression";
import { checkIsBracesFinished } from "./checkIsBracesFinished";

let calculator = document.getElementById("calculator");
let digitButtons = document.getElementById("digit-buttons");
let symbolButtons = document.getElementById("symbol-buttons");
let executeButton = document.getElementById("execute-button");
let clearAllButton = document.getElementById("clear-all");
let deleteButton = document.getElementById("delete");
let input = document.getElementById("input");
let output = document.getElementById("output");

function addToInput(symbol) {
  if (
    input.innerHTML !== "" &&
    output.innerHTML === "" &&
    ".1234567890".indexOf(symbol) !== -1
  ) {
    input.innerHTML = "";
  }
  if (symbol) {
    if (
      "+-/*.".indexOf(symbol) !== -1 &&
      "+-/*.".indexOf(input.innerHTML[input.innerHTML.length - 1]) !== -1
    ) {
      //user can`t write operator or dot right after operator or dot
      return 0;
    }
    if (
      "(".indexOf(symbol) !== -1 &&
      ".1234567890".indexOf(input.innerHTML[input.innerHTML.length - 1]) !== -1
    ) {
      //user can`t write open brace right after digit
      return 0;
    }
    input.innerHTML += symbol;
  }
}

calculator.addEventListener("click", (e) => {
  if (e.target.id === "execute-button") {
    return 0;
  }
  console.log(e.target.className);
  if (e.target.className === "calculator-button") {
    //calculator update output value after any action
    console.log(input.innerHTML.split(0, input.innerHTML.length));
    if (checkIsBracesFinished(input.innerHTML)) {
      if ("+-/*".indexOf(input.innerHTML[input.innerHTML.length - 1]) !== -1) {
        output.innerHTML =
          "=" +
          executeComplexExpression(
            input.innerHTML.slice(0, input.innerHTML.length - 1)
          );
      } else {
        output.innerHTML = "=" + executeComplexExpression(input.innerHTML);
      }
    }
  }
});

deleteButton.addEventListener("click", () => {
  console.log(input.innerHTML.length - 1);
  input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
});

digitButtons.addEventListener("click", (e) =>
  addToInput(e.target.dataset.digit)
);

symbolButtons.addEventListener("click", (e) =>
  addToInput(e.target.dataset.symbol)
);

clearAllButton.addEventListener("click", () => {
  input.innerHTML = "";
  output.innerHTML = "";
});

executeButton.addEventListener("click", (e) => {
  if (checkIsBracesFinished(input.innerHTML)) {
    input.innerHTML = executeComplexExpression(input.innerHTML);
    output.innerHTML = "";
  }
});
