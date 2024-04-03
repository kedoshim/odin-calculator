//Global Variables
let hasToReset = false;

//Visor
const visor = document.querySelector("#visor");

//Operators
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");

add.addEventListener("click", insertAdd);
subtract.addEventListener("click", insertSubtract);
divide.addEventListener("click", insertDivide);
multiply.addEventListener("click", insertMultiply);

//Utilities
const CE = document.querySelector("#CE");
const backspace = document.querySelector("#backspace");
const equals = document.querySelector("#equals");
const dot = document.querySelector("#dot");

CE.addEventListener("click", clear);
backspace.addEventListener("click", backspaceNumber);
equals.addEventListener("click", operate);
dot.addEventListener("click", addDot);

//Numbers
const numbers = [];

numbers[0] = document.querySelector("#zero");
numbers[1] = document.querySelector("#one");
numbers[2] = document.querySelector("#two");
numbers[3] = document.querySelector("#three");
numbers[4] = document.querySelector("#four");
numbers[5] = document.querySelector("#five");
numbers[6] = document.querySelector("#six");
numbers[7] = document.querySelector("#seven");
numbers[8] = document.querySelector("#eight");
numbers[9] = document.querySelector("#nine");

numbers.forEach((number) =>
  number.addEventListener("click", (e) =>
    insertNumber(parseInt(e.target.textContent))
  )
);

//Functions
function addNumber(n1, n) {
  return n1 + n;
}
function subtractNumber(n1, n) {
  return n1 - n;
}
function multiplyNumber(n1, n) {
  return n1 * n;
}
function divideNumber(n1, n) {
  return n1 / n;
}

function insertNumber(number) {
  reset();
  if (!isNaN(number)) {
    visor.textContent += number;
  }
}

function insertAdd() {
  hasToReset = false;
  visor.textContent += "+";
}
function insertSubtract() {
  hasToReset = false;
  visor.textContent += "-";
}
function insertMultiply() {
  hasToReset = false;
  visor.textContent += "*";
}
function insertDivide() {
  hasToReset = false;
  visor.textContent += "/";
}

function clear() {
  visor.textContent = "";
}

function backspaceNumber() {
  visor.textContent = visor.textContent.slice(0, -1);
  hasToReset = false;
}

function mapInfiniteDepth(array, callback) {
  // console.log(array);
  let new_array = array.map((element) => {
    if (Array.isArray(element)) {
      return mapInfiniteDepth(element, callback); // Recursively call the function for nested arrays
    } else {
      element = callback(element); // Call the callback function for non-array elements
      return element;
    }
  });
  // console.log(new_array);
  return new_array;
}

function reduceFixedDepth(array, depth, callback) {
  return array.map((item) => {
    if (Array.isArray(item)) {
      if (depth === 0) {
        return callback(item);
      }
      return reduceFixedDepth(item, depth - 1, callback); // Recursively call the function for nested arrays
    } else {
      return item;
    }
  });
}

function logMultiArray(multi_array, log = true) {
  let str = "";
  if (Array.isArray(multi_array)) {
    str = " [";
    str += multi_array.map((array) => logMultiArray(array, false));
    str += "]";
  } else {
    str += " " + multi_array;
  }
  if (log) {
    console.log("MultiArray -> ", str);
    return;
  }
  return str + " ";
}

function operate() {
  let text = visor.textContent;

  let tokens = [text];

  operators = ["+", "-", "*", "/"];

  operators.forEach((operator) => {
    tokens = mapInfiniteDepth(tokens, (token) => {
      token = "" + token;
      token = token.split(operator).map((inside_token) => inside_token.trim());
      if (token.length === 1 && Array.isArray(token) && !isNaN(token[0])) {
        token = token[0];
      }
      return token;
    });
  });
  logMultiArray(tokens);

  for (let i = 3; i >= 0; i--) {
    tokens = reduceFixedDepth(tokens, i, (array) => {
      switch (i) {
        case 0:
          //add
          return array.reduce((total, item) => {
            return parseFloat(total) + parseFloat(item);
          });
        case 1:
          //subtract
          return array.reduce((total, item) => {
            return parseFloat(total) - parseFloat(item);
          });
        case 2:
          //multiply
          return array.reduce((total, item) => {
            return parseFloat(total) * parseFloat(item);
          }, 1);
        case 3:
          //divide
          return array.reduce((total, item) => {
            return parseFloat(total) / parseFloat(item);
          });
      }
    });
  }
  let result = tokens[0];
  console.log("result => ", result);
  hasToReset = true;

  visor.textContent = result;
}

function addDot() {
  visor.textContent += ".";
}

function reset() {
  if (hasToReset == true) {
    clear();
    hasToReset = false;
  }
}
