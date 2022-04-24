const log = console.log;
// ============================================== Header =================================
const header = document.querySelector(".header");
const body = document.body;
const sections = document.querySelectorAll(".sec");
const navIcon = document.querySelector(".nav__icon");
const navShadow = document.querySelector(".nav .shadow");
const navUl = document.querySelector(".nav__ul");
const navLinks = document.querySelectorAll(".nav__ul a");
const navLogo = document.querySelector(".nav__logo");

//////////////////////////////////////////////////////// header background on scroll 
window.addEventListener("scroll",() => {
    if (scrollY >= 80) header.classList.add("scrolled")
    else header.classList.remove("scrolled")
})

//////////////////////////////////////////////////////// navIcon animate & show links
navIcon.addEventListener("click",() => {
    let count = navUl.children.length;
    navShadow.style.setProperty("--h", ((35 * count) + 10) + "px");

    if (navIcon.classList.contains("animate")) navIcon.classList.add("unAnimate"); 
    else navIcon.classList.remove("unAnimate"); 

    navShadow.classList.toggle("show");
    navIcon.classList.toggle("animate");
})

//////////////////////////////////////////////////////// click links to scroll for section 
let headerHeight = header.getBoundingClientRect().height;

navLinks.forEach(el=> {
    el.addEventListener("click", event => {
        event.preventDefault();
        navLinks.forEach(e => e.classList.remove("active"));
        el.classList.add("active");

        navShadow.classList.remove("show")
        navIcon.classList.remove("animate");
        navIcon.classList.add("unAnimate")

        const section = document.getElementById(el.dataset.scroll);
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: "smooth",
        })
    })
})

//////////////////////////////////////////////////////// nav logo click 
navLogo.addEventListener("click" , () => {
    navLinks[0].click();
})

///////////////////////////////////////////////////////// sync links with section
sections.forEach(s => {
    if ( scrollY >= s.offsetTop - headerHeight ) {
        let link = document.querySelector(`[data-scroll='${s.id}']`);
        navLinks.forEach(l => l.classList.remove("active"));
        if (!link){
            navLinks.forEach(l => l.classList.remove("active"));
            return;
        }
        link.classList.add("active");
    }
})
    
window.addEventListener("scroll",() => {
    sections.forEach(s => {
        if (scrollY >= s.offsetTop - headerHeight) {
            let link = document.querySelector(`[data-scroll='${s.id}']`);
            navLinks.forEach(l => l.classList.remove("active"));
            if (!link){
                navLinks.forEach(l => l.classList.remove("active"));
                return;
            }
            link.classList.add("active");
        }
    })
})
