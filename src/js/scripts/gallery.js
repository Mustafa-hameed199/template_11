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
