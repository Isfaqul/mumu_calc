// Grab Elements
const keyPad = document.querySelector("div[data-keypad]");
const mainDisplay = document.querySelector("div[data-main-display]");
const currentOpDisplay = mainDisplay.querySelector("h2");
const prevOpDisplay = mainDisplay.querySelector("p[data-prev-op]");
const decimalBtn = keyPad.querySelector("button[data-dec]");

// Variables to handle operations
let a = "";
let aChoosen = false;
let b = "";
let bChoosen = false;
let op = ""; // operator
let opChoosen = false;
let isEqualPressed = false;
// Stores result from pressing equals only
let result;
// Handle decimal point
let decUsedA = false;
let decUsedB = false;
// track prev operations
let prevOps = "";

// Event Listener for keyPad
keyPad.addEventListener("click", handleOperation);

// function to handle operation
function handleOperation(e) {
  // If target is a num
  if (e.target.hasAttribute("data-num")) {
    let digit = e.target.value;

    if (aChoosen && opChoosen) {
      b += digit;
      bChoosen = true;

      // Check if decimal has been used
      if (b.includes(".")) decUsedB = true;
      else decUsedB = false;

      updateDisplay(currentOpDisplay, b);
    } else {
      a += digit;
      aChoosen = true;

      // Check if decimal has been used
      if (a.includes(".")) decUsedA = true;
      else decUsedA = false;

      updateDisplay(currentOpDisplay, a);
    }
  }

  // If target is an operator
  if (e.target.hasAttribute("data-op")) {
    // if a and b has been chosen already
    if (aChoosen && bChoosen) {
      // Store the calculated rounded of result in result var
      result = Math.round(operate(a, b, op) * 10) / 10;
      a = +result;
      b = "";
      bChoosen = false;
      //enable decimal after b is blank
      enableDecimal();

      op = e.target.value;
      updateDisplay(currentOpDisplay, a);
      // if a is not chosen and equal btn has been pressed
    } else if (!aChoosen && isEqualPressed) {
      a = +result;
      aChoosen = true;
      op = e.target.value;
      opChoosen = true;
    } else if (aChoosen) {
      op = e.target.value;
      opChoosen = true;

      // Enable decimal button after operator has been chosen
      enableDecimal();
    }

    prevOps = `${a} ${op}`;
    updateDisplay(prevOpDisplay, prevOps);
  }

  // If target is equal button
  if (e.target.hasAttribute("data-equal")) {
    if (aChoosen && bChoosen && opChoosen) {
      isEqualPressed = true;

      // Enable decimal button after equal has been pressed
      enableDecimal();

      result = Math.round(operate(a, b, op) * 10) / 10;
      console.log("result:::", result);
      prevOps = `${a} ${op} ${b} =`;
      updateDisplay(prevOpDisplay, prevOps);
      updateDisplay(currentOpDisplay, result);

      // Set all variables to default;
      setOperationVarsToDefault();
    }
  }

  // Decimal Handler For every time it is pressed
  if (e.target.hasAttribute("data-dec")) {
    if (decUsedA) {
      disableDecimal();
    }

    if (decUsedB) {
      disableDecimal();
    }
  }

  // If target button is a reset button
  if (e.target.hasAttribute("data-reset")) {
    resetCalc();
  }

  // Del handler
  if (e.target.hasAttribute("data-del")) {
    console.log(e.target.value);

    if (aChoosen && !bChoosen) {
      a = a.slice(0, a.length - 1);
      updateDisplay(currentOpDisplay, a);

      // If a doesn't include a decimal
      if (!a.includes(".")) {
        enableDecimal();
      }

      // if all chars are removed, display 0
      if (!a) {
        enableDecimal();
        updateDisplay(currentOpDisplay, 0);
        a = 0;
      }
    } else if (bChoosen && opChoosen) {
      b = b.slice(0, b.length - 1);
      updateDisplay(currentOpDisplay, b);

      // If b doesn't include a decimal
      if (!b.includes(".")) {
        enableDecimal();
      }

      // if all chars are removed, display 0
      if (!b) {
        enableDecimal();
        updateDisplay(currentOpDisplay, 0);
        b = 0;
      }
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
  currentOpDisplay.innerText = "0";
  prevOpDisplay.innerText = "=";
  isEqualPressed = false;
  decUsedA = false;
  decUsedB = false;
}

// function to set all opereation variables back to default;
function setOperationVarsToDefault() {
  a = "";
  b = "";
  op = "";
  aChoosen = false;
  bChoosen = false;
  opChoosen = false;
}

// function to enable and disabled decimal
function enableDecimal() {
  decimalBtn.disabled = false;
}

function disableDecimal() {
  decimalBtn.disabled = true;
}

// Handle Theme Toggle
const themeToggleBtn = document.querySelector("div[data-theme-btn]");
const themeFileEl = document.querySelector("link[data-theme-file]");
let themeIndex = 1;

themeToggleBtn.addEventListener("click", toggleTheme);

// Theme toggle function
function toggleTheme() {
  const justifyOptions = ["flex-start", "center", "flex-end"];
  const themeFiles = ["color1.css", "color2.css", "color3.css"];
  themeToggleBtn.style.justifyContent = justifyOptions[themeIndex];
  themeFileEl.setAttribute("href", themeFiles[themeIndex]);
  themeIndex++;

  if (themeIndex === justifyOptions.length) {
    themeIndex = 0;
  }
}
