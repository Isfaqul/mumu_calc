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
let isEqualPressed = false;

// Event Listener for keyPad
keyPad.addEventListener("click", handleOperation);

// function to handle operation
function handleOperation(e) {
  let result;
  // If target is a num
  if (e.target.hasAttribute("data-num")) {
    let digit = e.target.value;

    if (aFlag && opFlag) {
      b += digit;
      bFlag = true;
      updateCurrentOpDisplay(currentOpDisplay, b);
    } else {
      a += digit;
      aFlag = true;
      updateCurrentOpDisplay(currentOpDisplay, a);
    }
  }

  // If target is a operator
  if (e.target.hasAttribute("data-op")) {
    if (aFlag && bFlag) {
      a = operate(a, b, op);
      b = "";
      bFlag = false;
      op = e.target.value;
      updateCurrentOpDisplay(currentOpDisplay, a);
    } else if (!aFlag && isEqualPressed) {
      a = result;
      aFlag = true;
      op = e.target.value;
      opFlag = true;
    } else if (aFlag) {
      op = e.target.value;
      opFlag = true;
    }
  }

  // If target is equal button
  if (e.target.hasAttribute("data-equal")) {
    if (aFlag && bFlag && opFlag) {
      isEqualPressed = true;
      result = operate(a, b, op);
      updateCurrentOpDisplay(currentOpDisplay, result);

      // Set all variables to default;
      setOperationVarsToDefault();
    }
  }

  // If target button is a reset button
  if (e.target.hasAttribute("data-reset")) {
    resetCalc();
  }

  console.log("A:", a, "B:", b, "OP:", op, "EQ:", isEqualPressed);
}

// Function to update Display
function updateCurrentOpDisplay(element, data) {
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
  currentOpDisplay.innerText = "0";
  prevOpDisplay.innerText = "=";
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
