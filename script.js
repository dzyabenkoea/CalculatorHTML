const input = document.querySelector('input')
input.value = 0
let memory = 0

document.querySelectorAll('button').forEach(
    el => {
        el.addEventListener('click',
            (event) => {
                const key = event.target
                key.classList.add('clicked')
                if (input.value == 0) input.value = ''
                
                const isOperatorKey = key.dataset.operator !== undefined
                if (isOperatorKey){
                    switch(key.dataset.operator){
                        case 'add': memory += Number(input.value); break;
                        case 'substract': memory -= Number(input.value); break;
                        case 'divide': memory /= Number(input.value); break;
                        case 'multiply': memory *= Number(input.value); break;
                    }
                    input.value = memory;
                } else{
                    input.value += el.textContent
                }

            })
        el.ontransitionend = () => { el.classList.remove('clicked') }
    })


