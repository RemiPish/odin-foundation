let currentInput = '0';
let leftOperand = null;
let operation = null;
let operationHistory = [];

function resetCalculator() {
    currentInput = '0';
    leftOperand = null;
    operation = null;
    operationHistory = [];
    updateDisplay();
    updateHistoryDisplay();
}

function updateDisplay() {
    document.querySelector('.calculator-screen-input').textContent = currentInput;
}

function updateHistoryDisplay() {
    document.querySelector('.calculator-screen-calc').textContent = operationHistory.join(' ');
}

function formatNumber(number) {
    return Math.abs(number) > 1e12 ? number.toExponential(3) : number;
}

function pressNumber(number) {
    if (currentInput === '0') {
        currentInput = number.toString();
    } else if (currentInput.length < 15) {
        currentInput += number.toString();
    }
    updateDisplay();
}

function pressDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.length === 1 ? '0' : currentInput.slice(0, -1);
    updateDisplay();
}

function setOperation(op) {
    if (leftOperand === null) {
        leftOperand = parseFloat(currentInput);
    } 
    operation = op;
    currentInput = '0'; 
    operationHistory = [leftOperand, operation];
    updateDisplay();
    updateHistoryDisplay();
}

function calculate() {
    if (operation && leftOperand !== null) {
        const rightOperand = parseFloat(currentInput);
        
        switch (operation) {
            case '+':
                leftOperand += rightOperand;
                break;
            case '-':
                leftOperand -= rightOperand;
                break;
            case '*':
                leftOperand *= rightOperand;
                break;
            case '/':
                if (rightOperand === 0) {
                    alert('Error: Division by zero');
                    resetCalculator();
                    return;
                }
                leftOperand /= rightOperand;
                break;
        }
        operationHistory = [leftOperand]
        currentInput = '0';
        operation = null; 
        leftOperand = null; 
        updateDisplay();
        updateHistoryDisplay();
    }
}

function handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key)) {
        pressNumber(key);  // If the key is a number
    } else if (key === '.') {
        pressDecimal();
    } else if (key === '+') {
        setOperation('+');
    } else if (key === '-') {
        setOperation('-');
    } else if (key === '*') {
        setOperation('*');
    } else if (key === '/') {
        setOperation('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key === 'c') {
        resetCalculator();
    } else if (key === 's') {
        toggleSign();
    }
}

resetCalculator();
window.addEventListener('keydown', handleKeyPress);
