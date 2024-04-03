//Global Variables
let hasToReset = false;

//Visor
const visor = document.querySelector("#visor");

//Operators
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");

//Utilities
const CE = document.querySelector("#CE");
const backspace = document.querySelector("#backspace");
const equals = document.querySelector("#equals");
const dot = document.querySelector("#dot");

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

//Event Listener

document.addEventListener("click", (e) => clickEventListener(e));
document.addEventListener("keydown", (e) => keydownEventListener(e));

function clickEventListener(event_info) {
  switch (event_info.target) {
    case add:
      insertAdd();
      return;
    case subtract:
      insertSubtract();
      return;
    case divide:
      insertDivide();
      return;
    case multiply:
      insertMultiply();
      return;

    case CE:
      clear();
      return;
    case backspace:
      removeLastChar();
      return;
    case equals:
      operate();
      return;
    case dot:
      addDot();
      return;

    case numbers[0]:
      insertNumber("0");
      return;
    case numbers[1]:
      insertNumber("1");
      return;
    case numbers[2]:
      insertNumber("2");
      return;
    case numbers[3]:
      insertNumber("3");
      return;
    case numbers[4]:
      insertNumber("4");
      return;
    case numbers[5]:
      insertNumber("5");
      return;
    case numbers[6]:
      insertNumber("6");
      return;
    case numbers[7]:
      insertNumber("7");
      return;
    case numbers[8]:
      insertNumber("8");
      return;
    case numbers[9]:
      insertNumber("9");
      return;
  }
}

function keydownEventListener(event_info) {
  console.log(event_info.key);
  switch (event_info.key) {
    case "+":
    case "Add":
      insertAdd();
      return;
    case "-":
    case "Subtract":
      insertSubtract();
      return;
    case "/":
    case "Divide":
      insertDivide();
      return;
    case "*":
    case "Multiply":
      insertMultiply();
      return;

    case "Clear":
    case "Escape":
      clear();
      return;
    case "Backspace":
      removeLastChar();
      return;
    case "Enter":
      operate();
      return;
    case "Decimal":
      addDot();
      return;

    case "0":
      insertNumber("0");
      return;
    case "1":
      insertNumber("1");
      return;
    case "2":
      insertNumber("2");
      return;
    case "3":
      insertNumber("3");
      return;
    case "4":
      insertNumber("4");
      return;
    case "5":
      insertNumber("5");
      return;
    case "6":
      insertNumber("6");
      return;
    case "7":
      insertNumber("7");
      return;
    case "8":
      insertNumber("8");
      return;
    case "9":
      insertNumber("9");
      return;
  }
}

//Disable Tab and Enter default behavior
window.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    e.preventDefault();
  }
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

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

function removeLastChar() {
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
