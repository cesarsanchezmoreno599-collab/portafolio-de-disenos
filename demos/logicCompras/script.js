/* =========================================
   LÓGICA LOGICOMPRAS - WEB C
   ========================================= */

// 1. MENÚ MÓVIL (Toggle y Auto-cerrado)
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

// Cerrar menú al hacer clic en un enlace (Solo para móviles)
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById("menu");
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
        }
    });
});

// 2. SCROLL SUAVE (Optimizado)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== "#") {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 3. EFECTO REVEAL (Aparecer al hacer scroll)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 120; // Ajuste para que se vea más natural

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
// Ejecutar una vez al cargar por si hay elementos visibles ya
reveal();

// 4. SIMULADOR DE RASTREO (El toque Pro)
const btnTrack = document.querySelector('.btn-track');
const inputTrack = document.querySelector('.track-input-group input');

if (btnTrack) {
    btnTrack.addEventListener('click', () => {
        const guia = inputTrack.value.trim();
        
        if (guia === "") {
            alert("Por favor, ingresa un número de guía.");
            return;
        }

        btnTrack.innerHTML = "Buscando...";
        btnTrack.disabled = true;

        setTimeout(() => {
            alert(`📦 Pedido #${guia}\nEstado: En tránsito hacia centro de distribución.\nUbicación: CDMX.`);
            btnTrack.innerHTML = "Rastrear";
            btnTrack.disabled = false;
        }, 1500);
    });
}

// 5. ENVÍO DE FORMULARIO DE CONTACTO
const formContacto = document.querySelector('.form-logistica');

if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        const btnSubmit = this.querySelector('button');
        const originalText = btnSubmit.innerHTML;

        btnSubmit.innerHTML = "Enviando Solicitud...";
        btnSubmit.style.background = "#94a3b8";
        btnSubmit.disabled = true;

        setTimeout(() => {
            alert("✅ ¡Solicitud enviada con éxito! Un consultor de Logicompras te contactará pronto.");
            btnSubmit.innerHTML = originalText;
            btnSubmit.style.background = "#38bdf8";
            btnSubmit.disabled = false;
            formContacto.reset();
        }, 2000);
    });
}