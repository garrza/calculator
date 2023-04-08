
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equals = document.getElementById("equals");
const digits = document.getElementById("digits");
const ac = document.getElementById("acs");

function setupCalc() {
    for (let i = 1; i <= 9; i++) {
        const numElement = document.createElement("button");
        numElement.id = "number-" + i;
        numElement.classList.add("digit");
        numElement.textContent = i;
        digits.appendChild(numElement);
    }
    const numElement = document.createElement("button");
    numElement.id = "number-0";
    numElement.classList.add("digit");
    numElement.textContent = 0;
    digits.appendChild(numElement);
}

window.onload = () => {
    setupCalc()
  }