// Base de datos de productos expandida
const productos = [
    { id: 1, nombre: "Laptop Pro 14", precio: 1200, cat: "tecnologia", img: "https://picsum.photos/200/150?random=1" },
    { id: 2, nombre: "Smartphone S24", precio: 950, cat: "tecnologia", img: "https://picsum.photos/200/150?random=2" },
    { id: 3, nombre: "Audífonos Noise Cancel", precio: 200, cat: "tecnologia", img: "https://picsum.photos/200/150?random=3" },
    { id: 4, nombre: "Monitor 4K 27\"", precio: 350, cat: "tecnologia", img: "https://picsum.photos/200/150?random=4" },
    { id: 5, nombre: "Cafetera Inteligente", precio: 80, cat: "hogar", img: "https://picsum.photos/200/150?random=5" },
    { id: 6, nombre: "Lámpara de Escritorio", precio: 45, cat: "hogar", img: "https://picsum.photos/200/150?random=6" },
    { id: 7, nombre: "Set de Sartenes Pro", precio: 110, cat: "hogar", img: "https://picsum.photos/200/150?random=7" },
    { id: 8, nombre: "Aspiradora Robot", precio: 300, cat: "hogar", img: "https://picsum.photos/200/150?random=8" },
    { id: 9, nombre: "Chaqueta de Invierno", precio: 120, cat: "ropa", img: "https://picsum.photos/200/150?random=9" },
    { id: 10, nombre: "Tenis Running", precio: 90, cat: "ropa", img: "https://picsum.photos/200/150?random=10" },
    { id: 11, nombre: "Gorra Deportiva", precio: 25, cat: "ropa", img: "https://picsum.photos/200/150?random=11" },
    { id: 12, nombre: "Reloj Elegante", precio: 180, cat: "ropa", img: "https://picsum.photos/200/150?random=12" }
];

let carrito = [];

// Función para mostrar productos (render)
function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    
    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="${p.img}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p class="precio">$${p.precio}</p>
                <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
            </div>
        `;
    });
}

// Lógica del buscador
document.getElementById("buscador").addEventListener("input", (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(termino));
    mostrarProductos(filtrados);
});

// Carrito y Alertas nativas
function agregarAlCarrito(id) {
    const p = productos.find(prod => prod.id === id);
    carrito.push(p);
    actualizarInterfaz();
    alert(`🛒 ${p.nombre} se agregó al carrito.`);
}

function actualizarInterfaz() {
    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((item, index) => {
        suma += item.precio;
        lista.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
    });

    total.innerText = suma;
    contador.innerText = carrito.length;
}

function toggleCarrito() {
    document.getElementById("carrito").classList.toggle("activo");
}

function vaciarCarrito() {
    if(confirm("¿Vaciar todo el carrito?")) {
        carrito = [];
        actualizarInterfaz();
    }
}

// Carga inicial
mostrarProductos(productos);