const priorOfOperations = {
  "+": 4,
  "-": 3,
  "/": 1,
  "*": 2,
};

function simpleCalc(a, b, op) {
  if (op == "+") return a + b;
  if (op == "-") return a - b;
  if (op == "/") return a / b;
  if (op == "*") return a * b;
}

function getOperations(string) {
  let operations = [];

  for (let i = 0; i < string.length; i++) {
    if (isNaN(string[i]) && string[i] != ".") {
      //check this is a operation symbol
      operations.push({
        symbol: string[i],
        prior: priorOfOperations[string[i]],
        positionsOfValues: [operations.length, operations.length + 1],
      });
    }
  }
  return operations.sort((a, b) => (a.prior > b.prior ? 1 : -1)); // sorting operations by priority
}

function getNumbers(string) {
  let numbers = [];
  let number = "";

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i]) || string[i] == ".") {
      //check this is a digit or .
      number = number + string[i];
    } else {
      numbers.push(number * 1);
      number = "";
    }
  }

  numbers.push(number * 1);
  return numbers;
}

function executeSimpleExpression(input) {
  let numbers = getNumbers(input);
  let operations = getOperations(input);
  for (let i = 0; i < operations.length; i++) {
    let operation = operations[i];
    value1 = numbers[operation.positionsOfValues[0]];
    value2 = numbers[operation.positionsOfValues[1]];
    numbers[operation.positionsOfValues[0]] = simpleCalc(
      value1,
      value2,
      operation.symbol
    );
    numbers.splice(operation.positionsOfValues[1], 1);

    for (let t = 0; t < operations.length; t++) {
      if (
        operations[t].positionsOfValues[0] >= operation.positionsOfValues[1]
      ) {
        operations[t].positionsOfValues[0] -= 1;
        operations[t].positionsOfValues[1] -= 1;
      }
    }
  }
  return numbers[0];
}

function executeComplexExpression(input) {
  simpleExpressions = [];
  for (i in input) {
    if (input[i] == "(") {
      let t = i * 1 + 1;
      let simpleExpression = "";
      while (input[t] != ")") {
        simpleExpression += input[t];
        t++;
      }
      simpleExpressions.push(simpleExpression);
    }
  }

  for (let i in simpleExpressions) {
    input = input.replace(
      "(" + simpleExpressions[i] + ")",
      executeSimpleExpression(simpleExpressions[i])
    );
  }

  return executeSimpleExpression(input);
}
