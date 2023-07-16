
function animateHeigh(element, time){
    let heightElement = element.offsetHeigh
    
    let timeInteval = heightElement / time
    
    
    var mainLoop = setInterval(() => {
        heightElement -= 10
        console.log(-heightElement + ' px')
        element.style.height = -heightElement + ' px'
    }, timeInteval)
    
    let timeOut = setTimeout(() => {
        clearInterval(mainLoop)
        console.log('fim')
    }, time
    )
}

const mobileNavBtn = document.getElementById('mobile-btn-menu')
const mobileNavContainer =  document.getElementById('mobile-hamburguer-menu')
const mobileMainNav = mobileNavContainer.querySelector('#nav-mobile')
mobileNavBtn.addEventListener('click', () => {
    if (mobileNavContainer.classList.contains('show-nav-mb')){
        mobileNavContainer.classList.remove('show-nav-mb')
        

        
    }
    else{
        mobileNavContainer.classList.add('show-nav-mb')

        
        

    }

})

const tables = document.querySelectorAll('.data-table')

tables.forEach((element) => {
    let tableBtn = element.querySelector('.table-btn')

    tableBtn.addEventListener('click', () => {
        let table = element.querySelector('.table-container')

        if (table.classList.contains('table-show')){
            table.classList.remove('table-show')
        }
        else{
            table.classList.add('table-show')
        }
    })
})


// funcao definida para fazer uma animacao no texto do input caso o mesmo seja do tipo texto
const fieldsetInputs = document.querySelectorAll('.create-task-fieldset')
fieldsetInputs.forEach((element) => {
    let label = element.querySelector('.text-placehoder')
    let elementType = element.getAttribute('form')
    if (elementType == 'text' || elementType == 'text-area'){
        let legendFildset = element.querySelector('legend')

        if (elementType == 'text'){
            var input = element.querySelector('input')
        }
        else if (elementType == 'text-area'){
            var input = element.querySelector('textarea')
        }

        input.addEventListener('focus', () => {
            label.classList.add('input-focus')
            legendFildset.classList.add('legend-item-focus')
        })
        input.addEventListener('blur', () => {
            if (!input.value){
                label.classList.remove('input-focus')
                legendFildset.classList.remove('legend-item-focus')
            }
        })
    }
    if (element.getAttribute('form') == 'text-area') {
        let textArea = element.querySelector('textarea')
        element.style.maxHeight = 150 + 'px'
        
        
        function adjustTextAreaHeight(){
            textArea.style.height = 'auto'
            textArea.style.height = textArea.scrollHeight + 'px'
            element.style.height = (textArea.scrollHeight + parseInt(getComputedStyle(textArea).marginTop, 10) + parseInt(getComputedStyle(textArea).marginBottom, 10)) + 'px'
        }
        adjustTextAreaHeight()
        
        textArea.addEventListener('input', adjustTextAreaHeight);
    }
      

})

const checkBoxFormRepeatTask = document.getElementById('check-loop')
const containerCheckboxWeek = document.getElementById('check-container')
checkBoxFormRepeatTask.addEventListener('change', () => {
    if (checkBoxFormRepeatTask.checked){
        containerCheckboxWeek.classList.add('show-check-container')
    }
    else{
        containerCheckboxWeek.classList.remove('show-check-container')
    }
})

