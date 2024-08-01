let firstNumber = null;
let secondNumber = null;
let step = 0;
let operation = null;
let result = 0;

let numArray = [];
let secondNumArray = [];

const display = document.querySelector('#display');

function getNumber(num) {
    if (num === '.' && ((step === 0 && numArray.length === 0) || (step === 1 && numArray.includes('.')))) {
        return;
    } else if (num === '.' && step === 2 && secondNumArray.includes('.')) {
        return;
    }

    if (step === 0 || step === 1) {
        numArray.push(num);
        step = 1;
        firstNumber = parseFloat(numArray.join(''));
        display.value = numArray.join('');
    } else if (step === 2 || step === 3) {
        secondNumArray.push(num);
        step = 3;
        secondNumber = parseFloat(secondNumArray.join(''));
        display.value = `${firstNumber} ${operation} ${secondNumArray.join('')}`;
    }
}

function getOperator(op) {
    if (step === 1) {
        step = 2;
        operation = op;
        display.value = `${firstNumber} ${operation}`;
    }
}

function clearDisplay() {
    display.value = 0;
    firstNumber = null;
    secondNumber = null;
    step = 0;
    operation = null;
    result = 0;
    numArray = [];
    secondNumArray = [];
}

function calculateEquals() {
    if (step !== 3) return; 

    switch (operation) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }
    display.value = result;
    firstNumber = result;
    secondNumber = null;
    operation = null;
    numArray = [result.toString()];
    secondNumArray = [];
    step = 1; 
}

//Function that adds the keyboard feature!!
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        getNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        getOperator(key);
    } else if (key === 'Enter') {
        calculateEquals();
    } else if (key === 'Backspace') {
        clearDisplay();
    }
});