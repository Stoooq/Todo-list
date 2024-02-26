const burgerBtn = document.querySelector('.burger')
const burgerBarsIco = document.querySelector('.fa-bars')
const burgerXIco = document.querySelector('.fa-times')
const burgerUl = document.querySelector('.burger-container ul')

const handleBurger = () => {
    burgerBtn.classList.toggle('active')
    burgerBarsIco.classList.toggle('hide')
    burgerXIco.classList.toggle('hide')
    burgerUl.classList.toggle('active')
}

burgerBtn.addEventListener('click', handleBurger)