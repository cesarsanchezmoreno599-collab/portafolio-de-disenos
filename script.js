const reveals = document.querySelectorAll(".reveal");

function revealScroll(){

const windowHeight = window.innerHeight;

reveals.forEach(el=>{

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 120){

el.classList.add("active");

}

});

}

window.addEventListener("scroll", revealScroll);
window.addEventListener("load", revealScroll);