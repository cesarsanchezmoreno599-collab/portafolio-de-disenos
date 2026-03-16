let productos = JSON.parse(localStorage.getItem("productos")) || [

{nombre:"Laptop",precio:15000,img:"https://picsum.photos/200?1"},
{nombre:"Celular",precio:8000,img:"https://picsum.photos/200?2"},
{nombre:"Audífonos",precio:1200,img:"https://picsum.photos/200?3"}

];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");

if(contenedor){

mostrarProductos(productos);

}

function mostrarProductos(lista){

contenedor.innerHTML="";

lista.forEach((p,i)=>{

contenedor.innerHTML+=`

<div class="card">

<img src="${p.img}">

<h3>${p.nombre}</h3>

<p>$${p.precio}</p>

<button onclick="agregar(${i})">Agregar</button>

</div>

`;

});

}

function agregar(i){

carrito.push(productos[i]);

localStorage.setItem("carrito",JSON.stringify(carrito));

actualizarCarrito();

}

function actualizarCarrito(){

const lista=document.getElementById("listaCarrito");

const contador=document.getElementById("contador");

const total=document.getElementById("total");

if(!lista)return;

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

localStorage.setItem("carrito",JSON.stringify(carrito));

actualizarCarrito();

}

/* BUSCADOR */

const buscador=document.getElementById("buscador");

if(buscador){

buscador.addEventListener("keyup",e=>{

const texto=e.target.value.toLowerCase();

const filtrados=productos.filter(p=>p.nombre.toLowerCase().includes(texto));

mostrarProductos(filtrados);

});

}

/* ADMIN */

const form=document.getElementById("formProducto");

if(form){

form.addEventListener("submit",e=>{

e.preventDefault();

const nombre=document.getElementById("nombre").value;

const precio=document.getElementById("precio").value;

const img=document.getElementById("imagen").value || "https://picsum.photos/200";

productos.push({nombre,precio,img});

localStorage.setItem("productos",JSON.stringify(productos));

alert("Producto agregado");

form.reset();

});

}