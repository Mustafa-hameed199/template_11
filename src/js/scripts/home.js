const homeBtn = document.querySelector(".home__btn");

homeBtn.addEventListener("click",e => {
    e.preventDefault();
    document.querySelector(".nav__ul li:nth-child(2) a").click();
})
