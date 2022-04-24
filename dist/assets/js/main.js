const question = document.querySelectorAll(".FAQ .question h3");

question.forEach(q => {
    q.addEventListener("click",()=> {
        let parent = q.parentElement;
        question.forEach(ques =>  {
            if (ques.parentElement == parent) return
            ques.parentElement.classList.remove("open")
        })
        parent.classList.toggle("open");
    })
})
const galleryBox = document.querySelector(".gallery__box");
const imgs = document.querySelectorAll(".gallery__box .img");
const popup_img = document.querySelector(".gallery .popup-img");
const slider = document.querySelector(".gallery .slider");
const images = document.querySelectorAll(".gallery__box .img img");
const btnRight = document.querySelector(".gallery .right-btn");
const btnLeft = document.querySelector(".gallery .left-btn");
const btnCancel = document.querySelector(".gallery .cancel-btn");

let plus = 0;

imgs.forEach(img => {
    img.addEventListener("click",()=> {
        document.body.style.overflow = "hidden";
        popup_img.classList.add("show");
        
        ///////////////////////////////// Count Images ///////////////
        let num = galleryBox.children.length;
        for (let i = 0; i < num ; i++) {
            let div = document.createElement("div");
            div.className = "item";
            div.append(images[i].cloneNode(true));
            slider.append(div);
        }

        let width = document.querySelector(".popup-img .item").getBoundingClientRect().width;

        [...slider.children].forEach(item => item.classList.remove("active"));
        let index = [...galleryBox.children].indexOf(img);
        slider.children[index].classList.add("active");
        
        
        slider.style.transform = `translateX(-${width * index}px)`;
        slider.style.transition = "none";
        plus = index;
    })
})

///////////////////////////////// Right & Left Buttons ///////////////
function galleryBtn(dir) {
    let width = document.querySelector(".popup-img .item").getBoundingClientRect().width;
    let active = document.querySelector(".gallery .slider .item.active");

    if (dir == "right") {
        plus++
        
        if (plus > galleryBox.children.length - 1 ) return plus = galleryBox.children.length - 1;
        active.nextElementSibling.classList.add("active");
        active.classList.remove("active");
    }
    else {
        plus--
        if (plus < 0 ) return plus = 0;
        active.previousElementSibling.classList.add("active");
        active.classList.remove("active");
    }
    slider.style.transition = ".5s ease"
    slider.style.transform = `translateX(-${width * plus}px)`
}


btnRight.addEventListener("click",()=> galleryBtn("right") )
btnLeft.addEventListener("click",()=> galleryBtn("left") )
btnCancel.addEventListener("click",()=> {
    document.body.style.overflow = "auto";
    popup_img.classList.remove("show");
})

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

const homeBtn = document.querySelector(".home__btn");

homeBtn.addEventListener("click",e => {
    e.preventDefault();
    document.querySelector(".nav__ul li:nth-child(2) a").click();
})

const elements = document.querySelectorAll(".spot");

let options = {
    threshold: ".25",
    rootMargin: "0px"
}

let observer = new IntersectionObserver(watch,options);

function watch(entries) {
    entries.forEach(el=> {
        if (el.isIntersecting) el.target.classList.add("revealed")
    })
}

elements.forEach(el => observer.observe(el));
const tSlider = document.querySelector(".testimonials .slider"); // tSlider => testimonials slider
const indicators = document.querySelector(".testimonials .indicators");
let counter = 5000;

///////////////////////////////////// Add indicators from counting the items(persons)
let length = tSlider.children.length;

for (let i = 0 ; i < length ; i++) {
    let li = document.createElement("li");
    indicators.append(li);
}

///////////////////////////////////// When click to indicators
indicators.children[0].classList.add("active");
[...indicators.children].forEach((li, i) => {
    li.addEventListener("click",()=> {
        [...indicators.children].forEach(el=> el.classList.remove("active"));
        li.classList.add("active");

        let width = tSlider.children[0].getBoundingClientRect().width;
        tSlider.style.transform = `translateX(-${width * i}px)`
    })
})

///////////////////////////////////// Show the Person Interval
let interval = setInterval(()=> {
    let active = document.querySelector(".testimonials .indicators .active");
    if (!active.nextElementSibling) return indicators.children[0].click()
    active.nextElementSibling.click();
},counter)
//# sourceMappingURL=main.js.map
