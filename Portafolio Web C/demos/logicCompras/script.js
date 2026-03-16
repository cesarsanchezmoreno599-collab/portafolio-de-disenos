// menú móvil

function toggleMenu(){

document.getElementById("menu").classList.toggle("active");

}


// scroll suave

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener('click',function(e){

e.preventDefault();

document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior:'smooth'
});

});

});

window.addEventListener("scroll",function(){

const reveals=document.querySelectorAll(".reveal");

for(let i=0;i<reveals.length;i++){

let windowHeight=window.innerHeight;
let elementTop=reveals[i].getBoundingClientRect().top;
let elementVisible=100;

if(elementTop < windowHeight - elementVisible){
reveals[i].classList.add("active");
}

}

});