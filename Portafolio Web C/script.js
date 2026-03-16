/* ELEMENTOS */

const modal = document.getElementById("modalFormulario");
const abrir = document.getElementById("abrirModal");
const cerrar = document.querySelector(".cerrar");

/* ABRIR MODAL */

if (abrir && modal) {

abrir.addEventListener("click", () => {

modal.style.display = "flex";

setTimeout(()=>{
modal.classList.add("activo");
},10);

});

}

/* CERRAR MODAL */

function cerrarModal(){

modal.classList.remove("activo");

setTimeout(()=>{
modal.style.display = "none";
},200);

}

/* CERRAR CON X */

if(cerrar){

cerrar.addEventListener("click", cerrarModal);

}

/* CERRAR AL HACER CLICK FUERA */

window.addEventListener("click",(e)=>{

if(e.target === modal){

cerrarModal();

}

});

/* CERRAR CON ESC */

document.addEventListener("keydown",(e)=>{

if(e.key === "Escape" && modal.style.display === "flex"){

cerrarModal();

}

});

/* ANIMACION SCROLL */

const reveals = document.querySelectorAll(".reveal");

function revealScroll(){

for(let i=0;i<reveals.length;i++){

const windowHeight = window.innerHeight;

const elementTop = reveals[i].getBoundingClientRect().top;

const visible = 120;

if(elementTop < windowHeight - visible){

reveals[i].classList.add("active");

}

}

}

window.addEventListener("scroll", revealScroll);