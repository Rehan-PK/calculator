// 1. Making functions + - * /
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b == '0') {
    alert('Dividing by "0" :( are you serious !');
  } else {
    return (a / b).toFixed(3);
  }
}

// 2. Three variables
let a = [], 
b = [], 
op, 
result;

let dotKey = document.querySelector("#dot");

// 3. creating function operate
function operate(a, op, b) {
  if (op == '+') {
    return add(a, b);
  } else if (op == '-') {
    return subtract(a, b);
  } else if (op == '*') {
    return multiply(a, b);
  } else if (op == '/') {
    return divide(a, b);
  } else {
    // alert("Not a valid operation");
  }
}

// 4. Basic html calculator with buttons and clear button
// DONE !

// 5. function that populates the display when we click number button
// Store ‘display value’ in a variable somewhere

// let buttons = document.querySelectorAll(".key");
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", 
//   () => a.push(`${buttons[i].innerHTML.trim()}`))
// }


// 6. Make the calculator work! You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.
//      You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
//      This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// Select all buttons of key class
let buttons = document.querySelectorAll(".key");
// add click eventlistener for all keys, check for input of numbers/operators
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", checkInput);
}

window.addEventListener('keydown', checkInput);

// converting above to switch statement
function checkInput(e) {
  let keyValue;
  
  if (!this.innerHTML) {
    keyValue = e.key;
  } else {
    keyValue = this.innerHTML.trim();
  };

  switch(keyValue) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      pushNumber(keyValue);
      updateBigDisplay();
      // console.log(keyValue);
      break;
    case "CLEAR":
      clearIt();
      updateBigDisplay();
      break;
    case "DELETE":
      deleteIt();
      updateBigDisplay();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      enableDotKey();
      pushOperator(keyValue);
      break;
    case "=":
      // 3 scenarios
      // 1. if a && !op && !b: then result = a & updateDisplay
      enableDotKey();
      if (result) {
        updateBigDisplay();
        a = result.toString().split('');
        result = null;
      } else if (a.length > 0 && !op && !b.length > 0) {
        updateBigDisplay();
        // 2. if a && op && !b: then result = a & op & updateDisplay
      } else if (a.length > 0 && op && !b.length > 0) {
        op = null;
        updateBigDisplay();
        // 3. if a && op && b: then same as below
      } else if (!a.length > 0 && !op && !b.length > 0) {
        updateBigDisplay();
      } else {
        result = operate(Number(a.join("")), op, Number(b.join("")))
        a.splice(0, a.length);
        b.splice(0, b.length);
        op = null;
        updateBigDisplay();
      }
    case ".":
      // 1. use pushNumber here, just add in pushNumber & disable this key
      pushNumber(keyValue);
      // 2. if already dot in number then don't add dot
      // 3. after operator key enable dotKey
      // 4. after equal key enable dotKey
  }
}

// check for existing variables (a,op,b,result) then decide about key operation
function pushNumber(keyValue) {
  let checkForInt = Number.isInteger(Number(keyValue));
  if (result && checkForInt) {
    clearIt();
    a.push(keyValue);
  } else if (a.length > 0 && op && checkForInt) {
    b.push(keyValue);
  } else if (!op && checkForInt) {
    a.push(keyValue);
  }

  // below for dotKey only
  if (result && keyValue == '.') {
    disableDotKey();
    clearIt();
    a.push(keyValue);
    updateBigDisplay();
  } else if (keyValue == '.' && !result && !op && !a.includes('.')) {
    disableDotKey();
    a.push(keyValue);
    updateBigDisplay();
  } else if (keyValue == '.' && !result && op && !b.includes('.')) {
    disableDotKey();
    b.push(keyValue);
    updateBigDisplay();
  }
}

function pushOperator(keyValue) {
  if (result) {
    op = keyValue;
    a.splice(0, a.length, result);
    b.splice(0, b.length);
    result = null;
    updateBigDisplay();
  } else if (a.length > 0 && op && b.length > 0) {
    result = operate(Number(a.join("")), op, Number(b.join("")));
    a.splice(0, a.length, result);
    op = keyValue;
    updateBigDisplay();
    b.splice(0, b.length);
    result = null;
  } else {
    op = keyValue;
    updateBigDisplay();
  }
}

function clearIt() {
  a.splice(0, a.length);
  b.splice(0, b.length);
  op = null;
  result = null;
}

function deleteIt() {
  if (result) {
    a = result.toString().split('');
    result = null;
    a.pop();
  } else if (b.length > 0) {
    b.pop();
  } else if (op) {
    op = null;
  } else if (a.length > 0) {
    a.pop();
  }
}

function updateBigDisplay() {
  let bigDisplay = document.querySelector(".live-display.big");
  if (result && !op) {
    bigDisplay.textContent = `${result}`;
  } else if (result && op) {
    bigDisplay.textContent = `${result + op}`;
  } else {
    bigDisplay.textContent = `${(a.join("") ? a.join("") : '') 
      + (op ? op : '') 
      + (b.join("") ? b.join("") : '')}`;
  }
}

// Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)

// check if a decimal already in the display & disable button if it is
function pushDecimal(keyValue) {
  let bigDisplay = document.querySelector(".live-display.big");
  // disable dotKey to prevent further input

  let bigDisplayText = bigDisplay.innerText;
  // here include condition that if the expression includes "." or if the expression after any of the symbols "+, -, /, *" includes the "." then disable the button to prevent further "." addition
  if (bigDisplayText.split(op)[1].includes('.')) {
    // disable the . button
    disableDotKey();
  } else if (!op && bigDisplayText.includes('.')) {
    // disable the . button
    disableDotKey();
  } else {
    if (result) {
      a.splice(0, a.length, result, keyValue);
    } else if (a && !op && !b) {
      a.push(keyValue);
    } else if (a && op && !b) {
      b.push(keyValue);
    }
    // else add it to the existing single number (i.e. 'result' or a - in this order exactly) / or the number after the symbol (i.e. b)

    // enableDotKey after the following:
    // 1. after any symbol is pressed + - / *
    // 2. after equal is pressed =
  }
}

function disableDotKey() {
  // https://stackoverflow.com/questions/11371550/change-hover-css-properties-with-javascript
  // https://www.quirksmode.org/dom/changess.html
  dotKey.style.backgroundColor = 'gray';
  dotKey.removeEventListener("click", checkInput);
  // dotKey.style = document.querySelector("#clear").style; this resets back to normal button with hover effects. setting background disabled hover
}

function enableDotKey() {
  dotKey.style = document.querySelector("#clear").style;
  dotKey.addEventListener('click', checkInput);
}