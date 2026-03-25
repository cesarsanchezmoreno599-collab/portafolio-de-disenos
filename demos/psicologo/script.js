console.log("Script cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalAgenda");
    const btnAbrir = document.getElementById("abrirSimulador");
    
    // Diagnóstico en consola
    if (!modal) console.error("ERROR: No se encontró el elemento con id='modalAgenda'");
    if (!btnAbrir) console.error("ERROR: No se encontró el elemento con id='abrirSimulador'");

    if (btnAbrir && modal) {
        btnAbrir.onclick = (e) => {
            e.preventDefault();
            console.log("Clic detectado en el botón");
            modal.style.setProperty("display", "flex", "important");
            document.body.style.overflow = "hidden";
        };
    }

    // Funciones de cerrar
    const cerrarTodo = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    document.querySelectorAll(".cerrar-modal").forEach(btn => {
        btn.onclick = cerrarTodo;
    });

    window.onclick = (event) => {
        if (event.target == modal) cerrarTodo();
    };
});
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SELECTORES
    const modal = document.getElementById("modalAgenda");
    const btnAbrir = document.getElementById("abrirSimulador");
    const btnCerrar = document.querySelectorAll(".cerrar-modal"); 
    const formulario = document.getElementById("formSimulacion");
    const mensajeExito = document.getElementById("mensajeExito");

    // 2. ABRIR EL MODAL
    if (btnAbrir && modal) {
        btnAbrir.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex"; 
            document.body.style.overflow = "hidden"; 
        });
    }

    // 3. CERRAR EL MODAL
    const cerrarTodo = () => {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    btnCerrar.forEach(btn => btn.onclick = cerrarTodo);

    window.onclick = (event) => {
        if (event.target == modal) cerrarTodo();
    };

    // 4. SIMULACIÓN DE AGENDADO
    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = formulario.querySelector("button");
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando agenda...';
            btn.disabled = true;

            setTimeout(() => {
                formulario.style.opacity = "0"; 
                setTimeout(() => {
                    formulario.style.display = "none";
                    mensajeExito.style.display = "block";
                    mensajeExito.style.animation = "modalPop 0.5s ease";
                }, 300);
                
                setTimeout(() => {
                    cerrarTodo();
                    setTimeout(() => {
                        formulario.style.display = "block";
                        formulario.style.opacity = "1";
                        mensajeExito.style.display = "none";
                        btn.innerHTML = "Confirmar Cita";
                        btn.disabled = false;
                        formulario.reset();
                    }, 500);
                }, 3500);
            }, 1500);
        });
    }

    // 5. FECHA MÍNIMA
    const inputFecha = document.getElementById('fechaCita');
    if (inputFecha) {
        const hoy = new Date().toISOString().split("T")[0];
        inputFecha.min = hoy;
    }

    // 6. MOTOR DE ANIMACIÓN (REVEAL) - ¡Ahora dentro del Listener!
    const revealSections = () => {
        const sections = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', revealSections);
    revealSections(); 

    // 7. SCROLL SUAVE PARA LINKS DEL NAV - ¡Ahora dentro del Listener!
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

}); // <--- AQUÍ se cierra todo el código correctamente