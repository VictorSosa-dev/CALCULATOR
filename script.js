const display1 = document.querySelector('.display-1')
const display2 = document.querySelector('.display-2')
const numbers = document.querySelectorAll('.number')
const operation = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const clearAll = document.querySelector('.all-clear')
const clearLast = document.querySelector('.last-entity-clear')

let dis1Num = ''
let dis2Num = ''
let result = null
let tempResult = null
let lastOperation = ''
let haveDot = false

//Get events from numbers
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true
        } else if (e.target.innerText === '.' && haveDot) {
            return
        }
        dis2Num += e.target.innerText
        display2.innerText = dis2Num
    })
})

//Get events from operations
operation.forEach(operation => {
    operation.addEventListener('click', (e) => {
        if (!dis2Num) return
        haveDot = false
        const operationName = e.target.innerText
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation()
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName)
        lastOperation = operationName
        console.log(result)
    })
})

function clearVar(name = '') {
    dis1Num += dis2Num + ' ' + name + ' '
    display1.innerText = dis1Num
    display2.innerText = ''
    dis2Num = ''
    tempResult = result
}

function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(dis2Num)
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num)
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num)
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num)
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}

equal.addEventListener('click', (e) => {
    if (!dis1Num || !dis2Num) return
    haveDot = false
    mathOperation()
    clearVar()
    display2.innerText = result
    tempResult.innerText = ''
    dis2Num = result
    dis1Num = ''
})

clearAll.addEventListener('click', (e) => {
    dis1Num = ''
    dis2Num = ''
    display1.innerText = '0'
    display2.innerText = '0'
    result = ''
    tempResult.innerText = ''
})

clearLast.addEventListener('click', (e) => {
    display2.innerText = ''
    dis2Num = ''
})

window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        clickButtonEl(e.key)
    }else if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '*' ||
        e.key === '%'
    ) {
        clickOperation(e.key)
    } else if(e.key === 'Enter' || e.key === '=') {
        clickEqual()
    }
})

function clickButtonEl(key) {
    numbers.forEach(button => {
        if(button.innerText === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operation.forEach(button => {
        if(button.innerText === key) {
            button.click()
        }
    })
}

function clickEqual() {
    equal.click()
}