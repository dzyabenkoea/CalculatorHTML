const input = document.querySelector('input')
input.value = 0
let memory = 0
let prevOperator = ''
let nextValue = false;
const allowedKeys = ["BackSpace", "."]
const operatorKeys = ["+", "-", "/", "*", "="]

function checkInput(key) {
    return allowedKeys.find((value) => value == inputValue) &&
        operatorKeys.find((value) => value == inputValue)
}

function processInput(inputValue) {
    if (Number(inputValue)) {
        if (input.value == 0)
            input.value = inputValue
        else
            input.value += inputValue
    }
    else if (allowedKeys.find((value) => value == inputValue)) { }
    if (inputValue == '=') {
        if (prevOperator) {
            const result = operate(memory, input.value, prevOperator)
            memory = 0
            input.value = result
            nextValue = true
        }
    }
    else {
        memory = input.value
        prevOperator = inputValue;
        nextValue = true;
    }

    // Только допустимые символы ввода
    if (checkInput(inputValue))
        operate(memory, value, inputValue)
}

document.querySelectorAll('button').forEach(
    el => {
        el.addEventListener('click',
            (event) => {
                const key = event.target
                key.classList.add('clicked')
                if (input.value == 0) input.value = ''
                const isOperatorKey = key.dataset.operator !== undefined

                if (isOperatorKey) {
                    if (key.dataset.operator == '=') {
                        if (prevOperator) {
                            const result = operate(memory, input.value, prevOperator)
                            memory = 0
                            input.value = result
                            nextValue = true
                        }
                    }
                    else {
                        memory = input.value
                        prevOperator = key.dataset.operator;
                        nextValue = true;
                    }
                }
                // Если введена цифра
                else {
                    // Если после операции вводится новое число очистить ввод
                    if (nextValue) {
                        input.value = key.textContent;
                        nextValue = false;
                    } else {
                        input.value += key.textContent;
                    }
                }
                el.ontransitionend = () => { el.classList.remove('clicked') }
            })

        function operate(value1, value2, operator) {
            value1 = Number(value1)
            value2 = Number(value2)
            switch (operator) {
                case '+': return value1 += value2;
                case '-': return value1 -= value2;
                case '/': return value1 /= value2;
                case '*': return value1 *= value2;
            }
        }
    })

document.addEventListener('keyup', (event) => {
    processInput(event.key)

})