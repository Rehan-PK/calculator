// Calculator object constructor
function Calculator () {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  this.calculate = function(str) {
    let splitted = str.split(" "),
      a = +splitted[0],
      op = splitted[1],
      b = +splitted[2];
    
    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  // this.addMethod = (name, func) => this.methods[name] = func;  
}

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
  return a / b;
}

// 2. Three variables
let a = [], 
b = [], 
op, 
result;

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

// -------------------1ST ATTEMPT-------------------
// let keyValue = buttons[i].innerHTML.trim();
// if (isNumber(keyValue)) {
//   a.push(keyValue);
//   display = a.join("");
//   console.log(display);
// } else if (keyValue == '+' || keyValue == '-' || keyValue == '*' || keyValue == '/') {
//   op = keyValue;
// } else {
//   return false;
// }

// -------------------2ND ATTEMPT-------------------
// let buttons = document.querySelectorAll(".key");
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", function () {
//     let keyValue = buttons[i].innerHTML.trim();
//     if (Number.isInteger(Number(keyValue))) {
//       a.push(keyValue);
//       display = a.join("");
//       console.log(display);
//     } else if (keyValue == '+' || keyValue == '-' || keyValue == '*' || keyValue == '/') {
//       op = keyValue;
//       console.log(op);
//     } else {
//       console.log('neither a number nor a symbol');
//     }
//   }
//   )
// }

// ---------------- CORRECT ---------------------
// Select all buttons of key class
let buttons = document.querySelectorAll(".key");
// add click eventlistener for all keys, check for input of numbers/operators
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => checkInput(i));
}
// function checkInput(key) {
//   let keyValue = buttons[key].innerHTML.trim();  
//   if (Number.isInteger(Number(keyValue))) {
//     a.push(keyValue);
//     display = a.join("");
//     console.log(display);
//     return a;
//   } else if (keyValue == '+' || keyValue == '-' || keyValue == '*' || keyValue == '/') {
//     op = keyValue;
//     console.log(op);
//     return op;
//   } else {
//     return console.log('neither a number nor an arithmetic operator');
//   }
// }

// function checkInput(key) {
//   let keyValue = buttons[key].innerHTML.trim();
//   let checkForInt = Number.isInteger(Number(keyValue));
//   if (checkForInt && !op) {
//     a.push(keyValue);
//     console.log(a);
//   } else if (checkForInt && op) {
//     b.push(keyValue);
//     console.log(b);
//   } else if (!checkForInt && !op) {
//     op = keyValue;
//     console.log(op);
//   } else if (keyValue == "=" && a && b && op) {
//     let result = operate(Number(a.join("")), op, Number(b.join("")));
//     a.splice(0, a.length);
//     b.splice(0, b.length);
//     op = null;
//     console.log(result);
//     return result;
//   } else if (keyValue == 'CLEAR') {
//     if (b.length > 0) {
//       b.splice(0, a.length);
//       a.splice(0, a.length);
//       op = null;
//     } else if (op) {
//       op = null;
//       a.splice(0, b.length);
//     } else if (a.length > 0) {
//       a.splice(0, a.length);
//     }
//   } else if (keyValue == 'DELETE') {
//     if (op) {
//       if (b.length > 0) {
//         b.pop();
//       } else {
//         op = null;
//       }
//     } else if (!op && a.length > 0) {
//       a.pop();
//     }
//   } else {
//     alert('neither a number nor an arithmetic operator');
//   }
// }

// pressing button clear makes op = clear, check it

// converting above to switch statement
function checkInput(key) {
  let keyValue = buttons[key].innerHTML.trim();
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
      pushKey(keyValue);
      updateBigDisplay();
      // console.log(keyValue);
      break;
    case "CLEAR":
      clearIt();
      updateBigDisplay();
      break;
    case "DELETE":
      deleteIt(keyValue);
      updateBigDisplay();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      op = keyValue;
      updateBigDisplay();
      break;
    case "=":
      result = operate(Number(a.join("")), op, Number(b.join("")))
      console.log(result);
      updateBigDisplay();
      a.splice(0, a.length);
      b.splice(0, b.length);
      op = null;
      result = null;
  }
}

function pushKey(keyValue) {
  let checkForInt = Number.isInteger(Number(keyValue));
  if (op && checkForInt) {
    b.push(keyValue);
    console.log(b);
  } else if (!op && checkForInt) {
    a.push(keyValue);
    console.log(a);
  }
}

function clearIt() {
  if (b.length > 0) {
    b.splice(0, a.length);
    a.splice(0, a.length);
    op = null;
  } else if (op) {
    op = null;
    a.splice(0, b.length);
  } else if (a.length > 0) {
    a.splice(0, a.length);
  }
}

function deleteIt() {
  if (op) {
    if (b.length > 0) {
      b.pop();
    } else {
      op = null;
    }
  } else if (!op && a.length > 0) {
    a.pop();
  }
}

function updateBigDisplay() {
  let bigDisplay = document.querySelector(".live-display.big");

  // if (op) {
  //   if (b.length > 0) {
  //     bigDisplay.textContent = `${a.join("") + op + b.join("")}`;
  //   } else if (op && a.length > 0) {
  //     bigDisplay.textContent = `${a.join("") + op}`;
  //   } else if (a.length > 0 && !op) {
  //     bigDisplay.textContent = `${a.join("")}`;
  //   } else {
  //     bigDisplay.textContent = 0;
  //   }
  // }

  if (result) {
    bigDisplay.textContent = `${result}`;
  } else {
    bigDisplay.textContent = `${(a.join("") ? a.join("") : '') 
    + (op ? op : '') 
    + (b.join("") ? b.join("") : '')}`;
  }
}

function updateSmallDisplay() {
  let smallDisplay = document.querySelector(".live-display small");
}

