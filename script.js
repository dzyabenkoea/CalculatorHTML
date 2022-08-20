const input = document.querySelector('input')
input.value = 0
let memory = 0
let prevOperator = ''
let nextValue = false;

document.querySelectorAll('button').forEach(
    el => {
        el.addEventListener('click',
            (event) => {
                const key = event.target
                key.classList.add('clicked')
                if (input.value == 0) input.value = ''
                const isOperatorKey = key.dataset.operator !== undefined

                if (isOperatorKey) {
                    if (key.dataset.operator == 'evaluate') {
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
                case 'add': return value1 += value2;
                case 'substract': return value1 -= value2;
                case 'divide': return value1 /= value2;
                case 'multiply': return value1 *= value2;
            }
        }
    })
