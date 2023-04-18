const DEFAULT_CURRENT = 0;
const DEFAULT_LAST = 0;
const DEFAULT_MODE = null;


let currentNum = DEFAULT_CURRENT;
let lastNum = DEFAULT_LAST;
let currentMode = DEFAULT_MODE;
let shouldResetScreen = false;

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("equals");
const acButton = document.getElementById("ac");
const lastOperationScreen = document.getElementById("lastOperationScreen")
const currentOperationScreen = document.getElementById("currentOperationScreen")


window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", evaluate);
acButton.addEventListener("click", clear);


digitButtons.forEach((digit) =>
digit.addEventListener("click", () => appendNumber(digit.textContent))
)

operatorButtons.forEach((operator) => 
operator.addEventListener("click", () => setOperation(operator.textContent))
)


function appendNumber(number) {
    if (currentOperationScreen.textContent === "0" || shouldResetScreen)
      resetScreen();
    currentOperationScreen.textContent += number;
 }

function clear() {
    currentOperationScreen.textContent = "0";
    lastOperationScreen.textContent = "";
    currentNum = "";
    lastNum = "";
    currentMode = null;
}

function resetScreen() {
    currentOperationScreen.textContent = "";
    shouldResetScreen = false;
}

function setOperation(operator) {
    if (currentMode !== null) evaluate();
    currentNum = currentOperationScreen.textContent;
    currentMode = operator;
    lastOperationScreen.textContent = `${currentNum} ${currentMode}`;
    shouldResetScreen = true;
}

function evaluate(){
    if (currentMode === null) return;
    if (currentMode === "÷" && currentOperationScreen.textContent === "0") {
        alert("You can't divide by 0!");
        return;
    }
    lastNum = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(operate(currentMode, currentNum, lastNum));
    lastOperationScreen.textContent = `${currentNum} ${currentMode} ${lastNum} =`;
    currentMode = null;
}
    
function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "c") clear();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "x";
    if (keyboardOperator === "-") return "−";
    if (keyboardOperator === "+") return "+";
}

function add(a, b) {
    return a + b;
}
  
function substract(a, b) {
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator){
      case "+":
        return add(a, b);
      case "−":
        return substract(a, b);
      case "x":
        return multiply(a, b);
      case "÷":
        if (b === 0) return null;
        else return divide(a, b);
      default:
        return null;
    }
}