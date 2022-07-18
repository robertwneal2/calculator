let numInput = null
let num1 = null
let num2 = null
let currentResult = null
let currentOperator = null
let currentHistory = null
let currentOperatorSymbol = null

numButtons = document.querySelectorAll('.num');
numButtons.forEach((button) => {
    button.addEventListener('click', pressNumButton)
})

clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', pressClearButton)

deleteButton = document.querySelector('.delete')
deleteButton.addEventListener('click', pressDeleteButton)

operatorButtons = document.querySelectorAll('.operator')
operatorButtons.forEach((operator) => {
    operator.addEventListener('click', pressOperatorButton)
})

equalsButton = document.querySelector('.equals')
equalsButton.addEventListener('click', pressEqualsButton)

function operate(operator, num1, num2) {
    return operator(num1, num2)
}

const add = function(num1, num2) {
    return num1 + num2
}

const subtract = function(num1, num2) {
    return num1 - num2
}

const multiply = function(num1, num2) {
    return num1 * num2
}

const divide = function(num1, num2) {
    return num1 / num2
}

function pressClearButton() {
    display = document.querySelector(".display-text")
    hist = document.querySelector(".display-history")
    display.textContent = '0'
    hist.textContent = ''
    resetValues()
}

function pressNumButton() {
    newVal = this.textContent
    if (numInput == null) {
        numInput = ''
    }
    numInput = numInput + newVal
    valToDisplay(numInput)
    numInput = parseInt(numInput.substring(0,11))
}

function pressDeleteButton() {
    display = document.querySelector(".display-text")
    currentText = display.textContent
    currentTextLength = currentText.length
    newText = currentText.substr(0,currentTextLength-1)
    newText = newText === '' ? null : parseInt(newText)
    numInput = newText
    display.textContent = newText
}

function pressOperatorButton() {
    if (numInput == null && num1 == null) { //operator pressed at beginning
        num1 = 0 
    } else if (num1 == null) {  //first num input
        num1 = numInput
    } else if (numInput != null) { //second num input
        num2 = numInput
        calcResult()
    } else { //result as input
        //do nothing
    }
    operatorType = this.textContent
    setOperator(operatorType)
    setHistory()
    numInput = null
}

function pressEqualsButton() {
    if (numInput != null) {
        num2 = numInput
        setHistory(" =")
        calcResult()
    }
}

function valToDisplay(val) {
    display = document.querySelector('.display-text')
    display.textContent = val.toString().substring(0,11)
}

function calcResult() {
    result = operate(currentOperator, num1, num2)
    valToDisplay(result)
    currentResult = result
    num1 = result
    num2 = null
    numInput = null
}

function setOperator(operatorType) {
    if (operatorType === '÷') {
        currentOperator = divide
    } else if (operatorType === '×') {
        currentOperator = multiply
    } else if (operatorType === '-') {
        currentOperator = subtract
    } else if (operatorType === '+') {
        currentOperator = add
    } else {
        console.log('Set operator error')
    }
    currentOperatorSymbol = operatorType
}

function setHistory(equals = '') {
    if (num2 == null) {
        numStr = ''
    } else {
        numStr = ` ${num2}`
    }
    hist = document.querySelector('.display-history')
    currentHistory = `${num1} ${currentOperatorSymbol}${numStr}${equals}`
    hist.textContent = currentHistory.substring(0,30)
}

function resetValues() {
    num1 = null
    num2 = null
    currentResult = null
    currentOperator = null
    currentHistory = null
    currentOperatorSymbol = null
    numInput = null
}