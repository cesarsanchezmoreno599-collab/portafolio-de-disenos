/* scroll suave */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener("click",function(e){
e.preventDefault();
document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
});
});
});


/* header desaparece al bajar */

let lastScroll=0;
const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

let currentScroll=window.pageYOffset;

if(currentScroll > lastScroll){
header.classList.add("oculto");
}else{
header.classList.remove("oculto");
}

lastScroll=currentScroll;

});


/* animaciones */

const reveals=document.querySelectorAll(".card, .container, .contacto");

window.addEventListener("scroll",()=>{

const windowHeight=window.innerHeight;

reveals.forEach(el=>{

const elementTop=el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
el.classList.add("active","reveal");
}

});

});


/* menú móvil */

const menuBtn=document.createElement("div");
menuBtn.classList.add("menu-toggle");
menuBtn.innerHTML="☰";

document.querySelector(".header").appendChild(menuBtn);

menuBtn.addEventListener("click",()=>{

document.querySelector(".nav").classList.toggle("active");

});