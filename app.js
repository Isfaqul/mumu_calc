// Grab Elements
const keyPad = document.querySelector("div[data-keypad]");
const mainDisplay = document.querySelector("div[data-main-display]");
const currentOpDisplay = mainDisplay.querySelector("h2");
const prevOpDisplay = mainDisplay.querySelector("p");

// Variables to handle operations
let a = "";
let aFlag = false;
let b = "";
let bFlag = false;
let op = ""; // operator
let opFlag = false;

// Event Listener for keyPad
keyPad.addEventListener("click", handleOperation);

// function to handle operation
function handleOperation(e) {
  // If target is a num
  if (e.target.hasAttribute("data-num")) {
    let digit = e.target.value;

    if (aFlag && opFlag) {
      b += digit;
      bFlag = true;
      updateDisplay(currentOpDisplay, b);
    } else {
      a += digit;
      aFlag = true;
      updateDisplay(currentOpDisplay, a);
    }
  }

  // If target is a operator
  if (e.target.hasAttribute("data-op")) {
    if (aFlag && bFlag) {
      a = operate(a, b, op);
      b = "";
      bFlag = false;
      updateDisplay(currentOpDisplay, a);
    } else if (aFlag) {
      op = e.target.value;
      opFlag = true;
    }
  }

  console.log("A:", a, "B:", b, "OP:", op);

  // If target is equal button
  if (e.target.hasAttribute("data-equal")) {
    if (aFlag && bFlag && opFlag) {
      a = operate(a, b, op);
      updateDisplay(currentOpDisplay, a);

      // Set all back to after result is displayed
      setOperationVarsToDefault();
    }
  }

  // If target button is a reset button
  if (e.target.hasAttribute("data-reset")) {
    resetCalc();
  }
}

// Function to update Display
function updateDisplay(element, data) {
  element.innerText = data;
}

// Function that handles operation
function operate(numA, numB, operation) {
  // Converting passed arguments to number
  numA = +numA;
  numB = +numB;

  let result;

  switch (operation) {
    case "+":
      result = numA + numB;
      break;
    case "-":
      result = numA - numB;
      break;
    case "×":
      result = numA * numB;
      break;
    case "÷":
      result = Math.round((numA / numB) * 10) / 10;
      break;
  }

  return result;
}

// Function to reset calculator
function resetCalc() {
  setOperationVarsToDefault();
  currentOpDisplay.innerText = "";
  prevOpDisplay.innerText = "";
}

// function to set all opereation variables back to default;
function setOperationVarsToDefault() {
  a = "";
  b = "";
  op = "";
  aFlag = false;
  bFlag = false;
  opFlag = false;
}
