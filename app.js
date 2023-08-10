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
// Stores result from pressing equals only
let result;
// Handle decimal point
let isDecimal = false;

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
      updateCurrentOpDisplay(currentOpDisplay, b);
    } else {
      a += digit;
      aFlag = true;
      updateCurrentOpDisplay(currentOpDisplay, a);
    }
  }

  // If target is a operator
  if (e.target.hasAttribute("data-op")) {
    // if a and b has been chosen already
    if (aFlag && bFlag) {
      // Store the calculated rounded of result in result var
      result = Math.round(operate(a, b, op) * 10) / 10;
      a = +result;
      b = "";
      bFlag = false;
      op = e.target.value;
      updateCurrentOpDisplay(currentOpDisplay, a);
      // if a is not chosen and equal btn has been pressed
    } else if (!aFlag && isEqualPressed) {
      a = +result;
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
      result = Math.round(operate(a, b, op) * 10) / 10;
      console.log("result:::", result);
      updateCurrentOpDisplay(currentOpDisplay, result);

      // Set all variables to default;
      setOperationVarsToDefault();
    }
  }

  // If target button is a reset button
  if (e.target.hasAttribute("data-reset")) {
    resetCalc();
  }

  // Del handler
  if (e.target.hasAttribute("data-del")) {
    console.log(e.target.value);

    if (aFlag && !bFlag) {
      a = a.slice(0, a.length - 1);
      updateCurrentOpDisplay(currentOpDisplay, a);

      // if all chars are removed, display 0
      if (!a) updateCurrentOpDisplay(currentOpDisplay, 0);
    } else if (bFlag && opFlag) {
      b = b.slice(0, b.length - 1);
      updateCurrentOpDisplay(currentOpDisplay, b);

      // if all chars are removed, display 0
      if (!b) updateCurrentOpDisplay(currentOpDisplay, 0);
    }
  }

  // console.log
  console.log(
    "A:",
    a,
    "B:",
    b,
    "OP:",
    op,
    "EQ:",
    isEqualPressed,
    "result: ",
    result
  );
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
  isEqualPressed = false;
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

// Del Character
