import { executeComplexExpression } from "./executeExpression";

let digitButtons = document.getElementById('digit-buttons');
let symbolButtons = document.getElementById('symbol-buttons');
let executeButton = document.getElementById('execute-button')
let input = document.getElementById('input')
let output = document.getElementById('output')

console.log(executeComplexExpression('((1+1)+1)'))

function checkIsExpressionFinished(expression) {
    if (expression[expression.length-1] === '+') { return false}

    for (var i = 0, depth = []; i < expression.length; i++) {
    switch (expression[i]) {
      case '(': depth.push(expression[i]); break;
      case ')': if (depth.pop() != '(') return false; break;

    }
  }
  return depth.length == 0;
}

function addToInput(symbol) {
    if (symbol) {
        if ('+-/*'.indexOf(symbol) !== -1 && '+-/*'.indexOf(input.innerHTML[input.innerHTML.length-1]) !== -1 ) { 
            return 0;
         }
        input.innerHTML += symbol

        if (checkIsExpressionFinished(input.innerHTML)){
        output.innerHTML = '=' + executeComplexExpression(input.innerHTML)
        }
    }
}

digitButtons.addEventListener('click', (e)=> addToInput(e.target.dataset.digit))
symbolButtons.addEventListener('click', (e)=> addToInput(e.target.dataset.symbol))
executeButton.addEventListener('click', (e) => {
    if (checkIsExpressionFinished(input.innerHTML)){
            input.innerHTML = executeComplexExpression(input.innerHTML)
            output.innerHTML = ''
    }
    
}
)
