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