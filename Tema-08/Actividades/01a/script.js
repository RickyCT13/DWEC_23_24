/* Instancia nuevos articulos */
class Articulo {
    static idAutoIncrement = 0;
    id;
    nombre;
    precio;
    unidades;
    imagen;

    constructor(id, nombre, precio, unidades, imagen) {
        if (id === null) {
            this.id = ++Articulo.idAutoIncrement;
        } else {
            this.id = parseInt(id);
        }
        this.nombre = nombre;
        this.precio = Number(precio).toFixed(2);
        this.unidades = parseInt(unidades);
        this.imagen = imagen;
    }

    getSubtotal() {
        return this.precio * this.unidades;
    }
}

class Cesta {
    #articulos = [];

    constructor(...articulos) {
        this.#articulos = articulos;
    }

    getArticulos() {
        return this.#articulos;
    }
    setArticulos(articulos) {
        this.#articulos = articulos;
    }

    add(articulo) {
        this.#articulos.push(articulo);
    }

    get(id) {
        return this.#articulos.find(
            (articulo) => articulo.id === id
        );
    }

    update(id, nombre, precio, unidades, imagen) {
        let articuloEdit = this.get(id);

        if (nombre !== null) {
            articuloEdit.nombre = nombre;
        }
        if (precio !== null) {
            articuloEdit.precio = precio;
        }
        if (unidades !== null) {
            articuloEdit.unidades = unidades;
        }
        if (imagen !== null) {
            articuloEdit.imagen = imagen;
        }
    }

    delete(id) {
        this.#articulos.splice(id, 1);
    }

    mostrar() {
        let tbody = document.getElementById("cesta");

        tbody.innerHTML = "";

        let total = 0;

        this.#articulos.forEach((articulo) => {
            let row = document.createElement("tr");

            let id = document.createElement("td");
            id.innerHTML = articulo.id;
            row.appendChild(id);

            let nombre = document.createElement("td");
            nombre.innerHTML = articulo.nombre;
            row.appendChild(nombre);

            let precio = document.createElement("td");
            precio.innerHTML = articulo.precio;
            row.appendChild(precio);

            let unidades = document.createElement("td");
            unidades.innerHTML = articulo.unidades;
            row.appendChild(unidades);

            let subtotal = document.createElement("td");
            subtotal.innerHTML = articulo.getSubtotal().toFixed(2);
            total += articulo.getSubtotal();
            row.appendChild(subtotal);

            let tdElim = document.createElement("td");
            tdElim.setAttribute("class", "border-0");

            let botonElim = document.createElement("button");
            botonElim.setAttribute("class", "btn btn-danger");

            let iconoElim = document.createElement("i");
            iconoElim.setAttribute("class", "bi-trash-fill");

            botonElim.appendChild(iconoElim);
            tdElim.appendChild(botonElim);
            row.appendChild(tdElim);

            tbody.appendChild(row);

        });

        tbody.getElementById("")

        this.setTotales(total);
    }

    setTotales(total) {
        let contTotal = document.querySelector("#precioTotal");
        let contTotalIVA = document.querySelector("#precioTotalIVA");

        let totalIVA = total * (total * 0.21);

        contTotal.innerHTML = `Total: ${total.toFixed(2)} €`;
        contTotalIVA.innerHTML = `Total + IVA (21%): ${totalIVA.toFixed(2)} €`;
    }
}

class ContArticulos {
    #arrArticulos = [];
    #cesta = new Cesta();

    constructor(arrArticulos) {
        let divArticulos = document.getElementById("articulos");
        arrArticulos.forEach((articulo) => {
            let divArtIndiv = document.createElement("div");
            divArtIndiv.setAttribute("class", "border rounded");
            divArtIndiv.setAttribute("idArticulo", articulo.getId());
            divArticulos.appendChild(divArtIndiv);

            let imagen = document.createElement("img");
            imagen.setAttribute("src", articulo.getImagen());
            img.setAttribute("alt", articulo.getNombre());
            divArtIndiv.appendChild(imagen);

            let nombre = document.createElement("h3");
            nombre.innerHTML = articulo.getNombre();
            divArtIndiv.appendChild(nombre);

            let precio = document.createElement("p");
            precio.innerHTML = articulo.getPrecio() + " €";
            divArtIndiv.appendChild(precio);

            let inputUnidades = document.createElement("input");
            inputUnidades.setAttribute("class", "form-control");
            inputUnidades.setAttribute("type", "number");
            inputUnidades.setAttribute("name", "cantidad");
            inputUnidades.setAttribute("step", "0");
            inputUnidades.setAttribute("min", "1");
            inputUnidades.setAttribute("value", "1");
            divArtIndiv.appendChild(inputUnidades);

            let boton = document.createElement("button");
            boton.setAttribute("class", "btn btn-primary");
            boton.innerHTML = "Añadir";
            divArtIndiv.appendChild(boton);

            boton.addEventListener(
                "click",
                (() => {
                    let cantidad = document.querySelector(`idArticulo="${articulo.getId()}"`).getElementsByTagName("input")[0].value;
                    
                }).bind(this)
            );
        });
    }
}
/*
let cesta = new Cesta(
    new Articulo(null, "Articulo 1", 20.50, 5, null),
    new Articulo(null, "Articulo 2", 2.50, 12, null),
    new Articulo(null, "Articulo 3", 27.50, 13, null)
);

cesta.mostrar();
*/
