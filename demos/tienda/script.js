const productos = [

{nombre:"Laptop Gamer",precio:18000,categoria:"tecnologia",img:"https://picsum.photos/200?1"},
{nombre:"Smartphone",precio:9000,categoria:"tecnologia",img:"https://picsum.photos/200?2"},
{nombre:"Audífonos",precio:1500,categoria:"tecnologia",img:"https://picsum.photos/200?3"},

{nombre:"Sofá moderno",precio:6000,categoria:"hogar",img:"https://picsum.photos/200?4"},
{nombre:"Lámpara",precio:900,categoria:"hogar",img:"https://picsum.photos/200?5"},

{nombre:"Chaqueta",precio:1200,categoria:"ropa",img:"https://picsum.photos/200?6"},
{nombre:"Tenis deportivos",precio:1800,categoria:"ropa",img:"https://picsum.photos/200?7"}

];

let carrito = [];

const contenedor = document.getElementById("productos");

function mostrarProductos(lista){

contenedor.innerHTML="";

lista.forEach((p,i)=>{

contenedor.innerHTML+=`

<div class="card">

<img src="${p.img}">

<h3>${p.nombre}</h3>

<p class="precio">$${p.precio}</p>

<button onclick="agregar(${i})">Agregar al carrito</button>

</div>

`;

});

}

mostrarProductos(productos);

function agregar(i){

carrito.push(productos[i]);

actualizarCarrito();

}

function actualizarCarrito(){

const lista = document.getElementById("listaCarrito");

const contador = document.getElementById("contador");

const total = document.getElementById("total");

lista.innerHTML="";

let suma=0;

carrito.forEach(p=>{

lista.innerHTML+=`<li>${p.nombre} - $${p.precio}</li>`;

suma+=p.precio;

});

contador.textContent=carrito.length;

total.textContent=suma;

}

function toggleCarrito(){

document.getElementById("carrito").classList.toggle("activo");

}

function vaciarCarrito(){

carrito=[];

actualizarCarrito();

}

function filtrar(cat){

if(cat==="todos"){
mostrarProductos(productos);
}else{

const filtrados=productos.filter(p=>p.categoria===cat);

mostrarProductos(filtrados);

}

}

document.getElementById("buscador").addEventListener("keyup",e=>{

const texto=e.target.value.toLowerCase();

const filtrados=productos.filter(p=>p.nombre.toLowerCase().includes(texto));

mostrarProductos(filtrados);

});