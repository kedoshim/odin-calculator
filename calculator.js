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
function addNumber(n1, n2) {
  return n1 + n2;
}
function subtractNumber(n1, n2) {
  return n1 - n2;
}
function multiplyNumber(n1, n2) {
  return n1 * n2;
}
function divideNumber(n1, n2) {
  return n1 / n2;
}

function insertNumber(number) {
  reset();
  if (!isNaN(number)) {
    current_number += number;
    visor.value += number;
  }
  console.log(current_number);
}

function insertAdd() {
  hasToReset = false;
  visor.value += "+";
  let number = current_number;
  current_number = "";
  current_funtion = function (n2) {
    return addNumber(parseInt(number), n2);
  };
}
function insertSubtract() {
  hasToReset = false;
  visor.value += "-";
  let number = current_number;
  current_number = "";
  current_funtion = function (n2) {
    return subtractNumber(parseInt(number), n2);
  };
}
function insertMultiply() {
  hasToReset = false;
  visor.value += "*";
  let number = current_number;
  current_number = "";
  current_funtion = function (n2) {
    return multiplyNumber(current_funtion(parseInt(number)), n2);
  };
}
function insertDivide() {
  hasToReset = false;
  visor.value += "/";
  let number = current_number;
  current_number = "";
  current_funtion = function (n2) {
    return divideNumber(current_funtion(parseInt(number)), n2);
  };
}

function clear() {
  visor.value = "";
  current_funtion = () => {};
  current_number = "";
}

function backspaceNumber() {
  current_number = current_number.slice(0, -1);
  visor.value = visor.value.slice(0, -1);
  hasToReset = false;
}

function calculate() {
  reset();
  console.log(current_funtion);
  if (current_funtion == undefined) {
    visor.value = parseInt(current_number);
    hasToReset = true;
    return;
  }
  let result = current_funtion(parseInt(current_number));
  visor.value = result;
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
