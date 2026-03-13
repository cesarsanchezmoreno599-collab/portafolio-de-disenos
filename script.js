const modal = document.getElementById("modalFormulario");
const abrir = document.getElementById("abrirModal");
const cerrar = document.querySelector(".cerrar");

/* ABRIR MODAL */

abrir.addEventListener("click", () => {
    modal.style.display = "flex";
});

/* CERRAR CON X */

cerrar.addEventListener("click", () => {
    modal.style.display = "none";
});

/* CERRAR AL HACER CLICK FUERA */

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* CERRAR CON ESC */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});