class Articulo {
    constructor(id, nombre, precio, cantidad, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.subtotal = this.precio * this.cantidad;
    }
}

class Cesta {
    constructor() {
        this.articulos = [];
        this.mostrarCesta();

        const datosGuardados = localStorage.getItem("cesta");

        if (datosGuardados) {
            this.articulos = JSON.parse(datosGuardados);
        }
    }

    addArticulo(articulo) {
        const index = this.articulos.findIndex((art) => art.id === articulo.id);

        if (index >= 0) {
            this.articulos[index] = articulo;
        }
        else {
            this.articulos.push(articulo);
        }

        this.mostrarCesta();
        
        if (this.articulos.length > 0) {
            localStorage.setItem("cesta", JSON.stringify(this.articulos));
        }
    }

    mostrarCesta() {
        const tablaCesta = document.getElementById("cuerpoTabla");
        tablaCesta.innerHTML = "";

        let total = 0;

        this.articulos.forEach((articulo) => {
            const fila = document.createElement("tr");

            const id = document.createElement("td");
            id.textContent = articulo.id;

            const nombre = document.createElement("td");
            nombre.textContent = articulo.nombre;

            const precio = document.createElement("td");
            precio.textContent = articulo.precio;

            const cantidad = document.createElement("td");
            cantidad.textContent = articulo.cantidad;

            const subtotal = document.createElement("td");
            subtotal.textContent = articulo.precio * articulo.cantidad;
            total += articulo.precio * articulo.cantidad;
            
            const tdElim = document.createElement("td");
            tdElim.setAttribute("class", "border-0");

            const botonElim = document.createElement("button");
            botonElim.setAttribute("class", "btn btn-danger");

            const iconoElim = document.createElement("i");
            iconoElim.setAttribute("class", "bi-trash-fill");
            botonElim.appendChild(iconoElim);
            tdElim.appendChild(botonElim);

            botonElim.addEventListener("click", () => {
                this.eliminarArticulo(articulo);
            });

            fila.appendChild(id);
            fila.appendChild(nombre);
            fila.appendChild(precio);
            fila.appendChild(cantidad);
            fila.appendChild(subtotal);
            fila.appendChild(tdElim);

            tablaCesta.appendChild(fila);
            
        });

        this.actualizarTotales(total);

        if (this.articulos.length > 0) {
            localStorage.setItem("cesta", JSON.stringify(this.articulos));
        }

    }
    actualizarTotales(total) {
        const elemTotal = document.querySelector("#totalPrecio");
        const elemTotIva = document.querySelector("#precioIVA");

        const totalIva = total + total * 0.21;

        elemTotal.textContent = `Total: ${total}€`;
        elemTotIva.textContent = `Total con IVA (21%): ${totalIva}€`;
    }

    eliminarArticulo(articulo) {
        const index = this.articulos.findIndex((art) => art.id === articulo.id);

        if (index >= 0) {
            this.articulos.splice(index, 1);
        }

        this.mostrarCesta();

        this.actualizarTotales(total);

        if (this.articulos.length >= 0) {
            localStorage.setItem("cesta", JSON.stringify(this.articulos));
        }
    }
}

class ContArticulos {
    constructor(articulos) {
        this.articulos = articulos;
    }

    mostrarArticulos() {
        const zonaArticulos = document.getElementById("articulos");

        this.articulos.forEach((articulo) => {
            const divArticulo = document.createElement("div");
            divArticulo.classList.add("border", "rounded");

            const imagen = document.createElement("img");
            imagen.src = articulo.imagen;
            imagen.width = 250;
            imagen.height = 250;

            const nombre = document.createElement("h3");
            nombre.textContent = articulo.nombre;

            const precio = document.createElement("p");
            precio.textContent = `${articulo.precio}€`;
            
            const inputCantidad = document.createElement("input");
            inputCantidad.classList.add("form-control");
            inputCantidad.type = "number";
            inputCantidad.value = "1";
            inputCantidad.min = 1;

            const botonAdd = document.createElement("button");
            botonAdd.classList.add("btn", "btn-primary");
            botonAdd.textContent = "Añadir";

            botonAdd.addEventListener("click", () => {
                const nuevaCantidad = parseInt(inputCantidad.value);

                const articuloEx = cestaArt.articulos.find((art) => art.id === articulo.id);

                if (articuloEx) {
                    articuloEx.cantidad += nuevaCantidad;
                }
                else {
                    const nuevoArt = new Articulo(
                        articulo.id,
                        articulo.nombre,
                        articulo.precio,
                        nuevaCantidad,
                        articulo.imagen
                    );
                    cestaArt.addArticulo(nuevoArt);
                }

                cestaArt.mostrarCesta();
            });

            divArticulo.appendChild(imagen);
            divArticulo.appendChild(nombre);
            divArticulo.appendChild(precio);
            divArticulo.appendChild(inputCantidad);
            divArticulo.appendChild(botonAdd);

            zonaArticulos.appendChild(divArticulo);
        });
    }
}

const cestaArt = new Cesta();

document.addEventListener("DOMContentLoaded", () => {
    const articulos = [
		new Articulo(
			1,
			"Smartphone",
			200,
			0,
			"assets/images/smartphone.jpg"
		),
		new Articulo(
			2,
			"Reloj",
			50,
			0,
			"assets/images/reloj.jpg"
		),
		new Articulo(
			3,
			"Teclado",
			40,
			0,
			"assets/images/teclado.jpg"
		),
		new Articulo(
			4,
			"Mando",
			45,
			0,
			"assets/images/mando.jpg"
		),
        new Articulo(
            5,
            "Patinete",
            400,
            0,
            "assets/images/patinete.jpg"
        ),
	];

    const contArticulos = new ContArticulos(articulos);
    contArticulos.mostrarArticulos();
});