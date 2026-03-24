document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SELECTORES
    const modal = document.getElementById("modalAgenda");
    const btnAbrir = document.getElementById("abrirSimulador");
    const btnCerrar = document.querySelector(".cerrar-modal");
    const formulario = document.getElementById("formSimulacion");
    const mensajeExito = document.getElementById("mensajeExito");

    // 2. FUNCION ABRIR
    if (btnAbrir && modal) {
        btnAbrir.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Evita scroll al estar abierto
        });
    }

    // 3. FUNCION CERRAR
    if (btnCerrar) {
        btnCerrar.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    // Cerrar si clickean fuera del cuadro blanco
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // 4. ENVÍO DEL FORMULARIO
    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = formulario.querySelector("button");
            btn.innerHTML = "Validando...";
            btn.disabled = true;

            setTimeout(() => {
                formulario.style.display = "none";
                mensajeExito.style.display = "block";
                
                setTimeout(() => {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                    // Reset para la próxima vez
                    formulario.style.display = "block";
                    mensajeExito.style.display = "none";
                    btn.innerHTML = "Confirmar Cita";
                    btn.disabled = false;
                    formulario.reset();
                }, 3000);
            }, 1500);
        });
    }

    // 5. FECHA MÍNIMA
    const inputFecha = document.getElementById('fechaCita');
    if (inputFecha) {
        inputFecha.min = new Date().toISOString().split("T")[0];
    }

    // 6. SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});