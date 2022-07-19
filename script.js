let numInput = null
let num1 = null
let num2 = null
let currentResult = null
let currentOperator = null
let currentHistory = null
let currentOperatorSymbol = null
const maxLength = 11

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

decimalButton = document.querySelector('.decimal')
decimalButton.addEventListener('click', pressDecimalButton)

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
    if (numInput == null || numInput == '0') {
        numInput = ''
    } else if (numInput.length > (maxLength - 1)) {
        return //cap input limit
    }
    numInput = numInput + newVal
    valToDisplay(numInput)
}

function pressDeleteButton() {
    display = document.querySelector(".display-text")
    currentText = display.textContent
    currentTextLength = currentText.length
    newText = currentText.substr(0,currentTextLength-1)
    newText = newText === '' ? '0' : newText
    eIndex = newText.indexOf('e')
    if (eIndex == (newText.length-1)) { //remove 'e' if last character
        newText = newText.substring(0, newText.length-1)
    }
    numInput = newText
    display.textContent = newText
}

function pressOperatorButton() {
    if (numInput == null && num1 == null) { //operator pressed at beginning
        num1 = '0' 
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
    if (numInput != null && num1 != null) {
        num2 = numInput
        setHistory(" =")
        calcResult()
    }
}

function pressDecimalButton() {
    numInput = numInput == null ? '0' : numInput
    if (!numInput.includes('.')) {
        numInput = (numInput + '.')
        valToDisplay(numInput)
    }
}

function valToDisplay(val) {
    display = document.querySelector('.display-text')
    display.textContent = shortenNumStr(val)
}

function calcResult() {
    result = operate(currentOperator, parseFloat(num1), parseFloat(num2))
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
    currentHistory = `${shortenNumStr(num1)} ${currentOperatorSymbol}${shortenNumStr(numStr)}${equals}`
    hist.textContent = currentHistory //.substring(0,25)
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

function shortenNumStr(num) {
    num = num.toString()
    if (num === '0.') {
        return num
    }
    while (num.length > maxLength) {
        if (num.includes('.')) {
            dotIndex = num.indexOf('.')
            if (dotIndex == (num.length-1)) {
                num = num.substring(0,num.length-1)
            } else {
                num = num.substring(0, num.length-1)
            }
        } else {
            tens = (num.length - maxLength) + 1
            tens += tens.toString().length
            num = parseFloat(num)
            num = num/(10**(tens))
            num = Math.round(num).toString()
            num = num + "e" + tens.toString()
        }  
    }
    return num
}

