window.addEventListener('load', ()=> {
    const navBurger = document.querySelector('.nav__burger')
    const burger =  document.querySelector('.burger')

    navBurger.addEventListener('click', (e) => {
        burger.classList.toggle('active')

    })



})