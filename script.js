/// ================= REVEAL ANIMATION (Tu código pro) =================
const reveals = document.querySelectorAll(".reveal");
function revealScroll(){
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 120){
      el.classList.add("active");
    }
  });
}
let ticking = false;
window.addEventListener("scroll", () => {
  if(!ticking){
    window.requestAnimationFrame(() => {
      revealScroll();
      ticking = false;
    });
    ticking = true;
  }
});
window.addEventListener("load", revealScroll);

// ================= MODAL CORREGIDO (EL QUE TE SIGUE) =================
const modal = document.getElementById("modal");
const btn = document.getElementById("abrirModal");
const span = document.getElementById("cerrarModal");

if(btn) {
    btn.onclick = () => {
        modal.classList.toggle("show");
        // 🛡️ FIX: Bloquea el scroll del fondo para que no haya saltos
        document.body.style.overflow = "hidden"; 
    };
}

if(span) {
    span.onclick = () => {
        modal.classList.remove("show");
        // 🛡️ FIX: Devuelve el scroll al cerrar
        document.body.style.overflow = "auto";
    };
}

// --- Lógica para Arrastrar (Draggable) ---
dragElement(document.getElementById("modalContent"));

function dragElement(elmnt) {
  if (!elmnt) return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById("modalHeader")) {
    document.getElementById("modalHeader").onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    // 🛡️ SEGURO: Si la pantalla es menor a 768px, no permitas el arrastre
    if (window.innerWidth <= 768) return; 

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    elmnt.parentElement.style.position = "fixed"; 
    elmnt.parentElement.style.top = (elmnt.parentElement.offsetTop - pos2) + "px";
    elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// --- Lógica de Envío de Formulario con Mensaje PRO ---
const formularioBoceto = modal ? modal.querySelector('form') : null;

if (formularioBoceto) {
    formularioBoceto.onsubmit = async function(e) {
        e.preventDefault(); 
        
        const btnEnviar = formularioBoceto.querySelector('.btn-enviar-modal');
        const formData = new FormData(formularioBoceto);
        
        const textoOriginal = btnEnviar.innerHTML;
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<span class="spinner"></span> Enviando...'; 

        try {
            const respuesta = await fetch(formularioBoceto.action, {
                method: 'POST',
                body: formData
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                btnEnviar.innerHTML = "¡Boceto enviado! ✅";
                btnEnviar.style.backgroundColor = "#28a745"; 
                
                alert("¡Eureka! " + resultado.mensaje); 
                formularioBoceto.reset(); 
                
                setTimeout(() => {
                    modal.classList.remove("show");
                    document.body.style.overflow = "auto"; // Importante devolver el scroll
                    btnEnviar.innerHTML = textoOriginal;
                    btnEnviar.disabled = false;
                    btnEnviar.style.backgroundColor = ""; 
                }, 2000);

            } else {
                throw new Error();
            }
        } catch (error) {
            btnEnviar.innerHTML = "Error al enviar ❌";
            btnEnviar.style.backgroundColor = "#dc3545";
            setTimeout(() => {
                btnEnviar.innerHTML = textoOriginal;
                btnEnviar.disabled = false;
                btnEnviar.style.backgroundColor = "";
            }, 3000);
        }
    };
}

// =========================================
// 1. CONFIGURACIÓN DE FOTOS 
// =========================================
const fotosPorEjemplo = {
    tienda: ["img/tienda.jpg"], 
    informativa: ["img/cabeza.jpg"], 
    catalogo: ["img/catalogo.jpg"]
};

let fotosActuales = [];
let indiceActual = 0;

const modalE = document.getElementById("modalEjemplo");
const imgE = document.getElementById("fotoEjemplo");
const contadorE = document.getElementById("contadorFotos");

// =========================================
// 3. FUNCIONES DEL CARRUSEL (EJEMPLOS)
// =========================================
function abrirCarrusel(id) {
    fotosActuales = fotosPorEjemplo[id];
    if (!fotosActuales) return;
    
    indiceActual = 0;
    actualizarImagen();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    modalE.style.top = scrollTop + "px";
    modalE.style.display = "flex";
    document.body.style.overflow = "hidden"; // También bloqueamos scroll aquí
}

function actualizarImagen() {
    imgE.src = fotosActuales[indiceActual];
    if (contadorE) {
        contadorE.innerText = `Imagen ${indiceActual + 1} de ${fotosActuales.length}`;
    }
}

document.getElementById("nextBtn").onclick = (e) => {
    e.stopPropagation();
    indiceActual = (indiceActual + 1) % fotosActuales.length;
    actualizarImagen();
};

document.getElementById("prevBtn").onclick = (e) => {
    e.stopPropagation();
    indiceActual = (indiceActual - 1 + fotosActuales.length) % fotosActuales.length;
    actualizarImagen();
};

document.getElementById("cerrarEjemplo").onclick = () => {
    modalE.style.display = "none";
    document.body.style.overflow = "auto"; 
};

// =========================================
// 5. CERRAR TODO AL CLICAR FUERA
// =========================================
window.onclick = function(event) {
    if (event.target == modalE) {
        modalE.style.display = "none";
        document.body.style.overflow = "auto";
    }
    if (event.target == modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto"; // Devolvemos el scroll
    }
};

// =========================================
// 6. CONECTAR BOTONES "VER EJEMPLO"
// =========================================
document.querySelectorAll(".btn-ejemplo").forEach(boton => {
    boton.onclick = (e) => {
        e.preventDefault();
        const id = boton.getAttribute("data-id");
        abrirCarrusel(id);
    };
});