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