
const digits = document.querySelectorAll(".digit");
const operations = document.querySelectorAll(".operations");
const equalsButton = document.getElementById("equal");
const allClearButton = document.getElementById("AC");
const display = document.getElementById("screen");
const dot = document.getElementById("dot");


// Math functions

function add(x, y) {
    return parseFloat(x) + parseFloat(y);
}

function subtract(x, y) {
    return parseFloat(x) - parseFloat(y);
}

function multiply(x, y) {
    return parseFloat(x) * parseFloat(y);
}

function divide(x, y) {
    return parseFloat(x) / parseFloat(y);
}

let dotCounterNum1 = 0;
let dotCounterNum2 = 0;

let num1 = "";
let num2 = "";
let oper = "";

operations.forEach(operation => {
    operation.addEventListener("click", function() {
        oper = operation.textContent;
    })
})


digits.forEach(digit => {
    digit.addEventListener("click", function() {
        if(oper === "") {
            // To prevent entering more than 1 dot
            if(digit.textContent === "." && dotCounterNum1 === 0) {
                num1 += digit.textContent;
                display.textContent = num1;
                dotCounterNum1++;
            }
            else if(digit.textContent != ".") {

                // Percentage and plus-minus sign

                if(digit.textContent === "%") {
                    num1 = Number(num1);
                    num1 = (num1 / 100).toString();
                    display.textContent = num1;
                
                }
                else if(digit.textContent === "+/-") {
                    num1 = Number(num1);
                    num1 = (num1 * -1).toString();
                    display.textContent = num1;
                }
                else {
                    num1 += digit.textContent;
                    display.textContent = num1;
                }
            }
        }

        else {
            // To prevent entering more than 1 dot

            if(digit.textContent === "." && dotCounterNum2 === 0) {
                num2 += digit.textContent;
                display.textContent = num2;
                dotCounterNum2++;
            }
            else if(digit.textContent != ".") {

                // Percentage and plus-minus sign

                if(digit.textContent === "%") {
                    num2 = Number(num2);
                    num2 = (num2 / 100).toString();
                    display.textContent = num2;
                }

                else if(digit.textContent === "+/-") {
                    num2 = Number(num2);
                    num2 = (num2 * -1).toString();
                    display.textContent = num2;
                }
                else {
                    num2 += digit.textContent;
                    display.textContent = num2;
            
                }
            }
            
        }
    })
})

// Keyboard feature for the calculator
document.addEventListener("keydown", function(e) {
    if(Number(e.key) > -1 || Number(e.key) < 10) {
        console.log(e);
        if(oper === "") {
            num1 += e.key;
            display.textContent = num1;
        }

        else {
            console.log(oper);
            num2 += e.key;
            display.textContent = num2;
        }
    }
})


// This function takes 2 number and 1 operator as parameter

function operate(func, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if(func === "+") {
        return add(a, b);
    }
    else if(func === "-") {
        return subtract(a, b);
    }
    else if(func === "*") {
        return multiply(a, b);
    }
    else if(func === "/") {
        return divide(a, b);
    }
    
}


// After the clicking equal sign the result will be displayed

equalsButton.addEventListener("click", function() {

    // Checking if division is valid
    if(num2 === "0" && oper === "/") {
        alert("You are trying to divide a number by zero");
    }
    else {
        num1 = operate(oper, num1, num2);
        display.textContent = round(num1, 2);
        num1 = round(num1, 2);
        num2 = "";
        oper = "";
    }
})



// This will clear all the values and make display value 0
allClearButton.addEventListener("click", function() {
    display.textContent = 0;
    num1 = "";
    num2 = "";
    oper = "";
})

// I found this round function at https://www.jacklmoore.com/notes/rounding-in-javascript/

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// Deleting the entered wrong input
window.addEventListener("keydown", function(e) {
    if(e.key === "Backspace") {
        if(oper === "") {
            num1 = "";
            display.textContent = 0;
        }
        else if(num1 != "" && num2 === "" && oper != "") {
            oper = "";
        }

        else {
            num2 = "";
            display.textContent = 0;
        }
    }
})

