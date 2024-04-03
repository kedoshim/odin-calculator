//Global Variables
let current_number = "";
let current_funtion;
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
equals.addEventListener("click", calculate);
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
    current_number += number;
    visor.textContent += number;
  }
  // console.log(current_number);
}

function insertAdd() {
  hasToReset = false;
  visor.textContent += "+";
  let number = current_number;
  current_number = "";
  current_funtion = function (n) {
    return addNumber(parseInt(number), n);
  };
}
function insertSubtract() {
  hasToReset = false;
  visor.textContent += "-";
  let number = current_number;
  current_number = "";
  current_funtion = function (n) {
    return subtractNumber(parseInt(number), n);
  };
}
function insertMultiply() {
  hasToReset = false;
  visor.textContent += "*";
  let number = current_number;
  current_number = "";
  current_funtion = function (n) {
    return multiplyNumber(current_funtion(parseInt(number)), n);
  };
}
function insertDivide() {
  hasToReset = false;
  visor.textContent += "/";
  let number = current_number;
  current_number = "";
  current_funtion = function (n) {
    return divideNumber(current_funtion(parseInt(number)), n);
  };
}

function clear() {
  visor.textContent = "";
  current_funtion = "";
  current_number = "";
}

function backspaceNumber() {
  current_number = current_number.slice(0, -1);
  visor.textContent = visor.textContent.slice(0, -1);
  hasToReset = false;
}

function calculate() {
  console.log(current_funtion);
  if (current_funtion == undefined || current_funtion == "") {
    hasToReset = true;
    visor.textContent = parseInt(current_number);
    return;
  }
  if (current_number === "") current_number = 0;
  console.log(current_number);
  let result = current_funtion(parseInt(current_number));
  visor.textContent = result;
  current_number = result;
  current_funtion = () => {};
  hasToReset = true;
}

function addDot() {
  current_number += ".";
}

function reset() {
  if (hasToReset == true) {
    clear();
    hasToReset = false;
  }
}
