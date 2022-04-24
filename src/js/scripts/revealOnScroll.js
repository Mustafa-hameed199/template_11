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