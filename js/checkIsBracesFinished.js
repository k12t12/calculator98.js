function checkIsBracesFinished(expression) {
  for (var i = 0, depth = []; i < expression.length; i++) {
    switch (expression[i]) {
      case "(":
        depth.push(expression[i]);
        break;
      case ")":
        if (depth.pop() != "(") return false;
        break;
    }
  }
  return depth.length == 0;
}

export { checkIsBracesFinished };
