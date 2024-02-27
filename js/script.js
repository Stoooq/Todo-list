const burgerBtn = document.querySelector('.burger')
const burgerBarsIco = document.querySelector('.burger .fa-bars')
const burgerXIco = document.querySelector('.burger .fa-times')
const burgerUl = document.querySelector('.burger-container ul')
const todoAddBtn = document.querySelector('.todo-add')
const addInput = document.querySelector('.add-input')
const confirmBtn = document.querySelector('.add-confirm')
const cancelBtn = document.querySelector('.add-cancel')
const addText = document.querySelector('.add-text')
// const todoCheckBox = document.querySelector('.todo-check-box')
// const todoCircleIco = document.querySelectorAll('.todo-check-box .fa-circle')
// const todoCheckCircleIco = document.querySelectorAll('.todo-check-box .fa-circle-check')

const handleBurger = () => {
    burgerBtn.classList.toggle('active')
    burgerBarsIco.classList.toggle('hide')
    burgerXIco.classList.toggle('hide')
    burgerUl.classList.toggle('active')
}

const openAddInput = () => {
    addInput.classList.remove('hide-add')
    confirmBtn.addEventListener('click', confirmInput)
    cancelBtn.addEventListener('click', cancelInput)
}

const confirmInput = () => {
    
}

const cancelInput = () => {
    addText.textContent = ''
    addInput.classList.add('hide-add')
}

// const handleTodoCheck = (e) => {
//     console.log(e.target);
//     todoCircleIco.forEach((el) => el.classList.toggle('hide'))
//     todoCheckCircleIco.forEach((el) => el.classList.toggle('hide'))
//     todoCircleIco.classList.toggle('hide')
//     todoCheckCircleIco.classList.toggle('hide')
// }

burgerBtn.addEventListener('click', handleBurger)
todoAddBtn.addEventListener('click', openAddInput)
// todoCheckBox.addEventListener('click', handleTodoCheck)