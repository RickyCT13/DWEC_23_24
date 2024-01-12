"use strict";

class Articulo {
    #id;
    #nombre;
    #precio;
    #unidades;
    #subtotal;

    constructor(id, nombre, precio, unidades) {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = Number(precio).toFixed(2);
        this.#unidades = parseInt(unidades);
        this.#subtotal = precio * unidades;
    }

    getId() {
        return this.#id;
    }

    setId(newId) {
        this.#id = newId;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(newNombre) {
        this.#nombre = newNombre;
    }

    getPrecio() {
        return this.#precio;
    }

    setPrecio(newPrecio) {
        this.#precio = newPrecio;
    }

    getUnidades() {
        return this.#unidades;
    }

    setUnidades(newUnidades) {
        this.#unidades = newUnidades;
    }

    getSubtotal() {
        return Number(this.#subtotal);
    }

    setSubtotal(newSubtotal) {
        this.#subtotal = newSubtotal;
    }
}

class Cesta {
    #articulos;

    constructor(...articulos) {
        this.#articulos = [...articulos];
    }

    getArticulos() {
        return this.#articulos;
    }

    setArticulos(newArticulos) {
        this.#articulos = newArticulos;
    }

    insertar() {
        var id = prompt("Introduzca el código del artículo.");
        var nombre = prompt("Introduzca el nombre del artículo.");
        var precio = prompt("Introduzca el precio por unidad del artículo.");
        var unidades = prompt("Introduzca las unidades disponibles.");
        this.#articulos.push(new Articulo(id, nombre, precio, unidades));
        alert("Artículo insertado con éxito.");
    }

    eliminar() {
        var id = parseInt(prompt("Introduzca el código del artículo que desea eliminar."));
        var indice = this.#articulos.findIndex((articulo) => articulo.getId() === id);
        if (indice != -1) {
            this.#articulos.splice(indice, 1);
            alert("Artículo eliminado con éxito.");
        }
        else {
            alert("Error: Artículo no encontrado");
        }
    }

    vaciar() {
        this.#articulos = [];
        alert("Se ha vaciado la cesta.");
    }

    mostrar() {
        var cabecera = `
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Unidades</th>
                <th>Subtotal</th>
            </tr>
        </thead>

        `;
        var cuerpo = `<tbody>`;
        for (const articulo of this.#articulos) {
            cuerpo += `
                <tr align="center">
                    <td>${articulo.getId()}</td>
                    <td>${articulo.getNombre()}</td>
                    <td>${articulo.getPrecio()}</td>
                    <td>${articulo.getUnidades()}</td>
                    <td>${articulo.getSubtotal().toFixed(2)}</td>
                </tr>
            `;
        }
        cuerpo.concat(`</tbody>`);
        var total = 0;
        for (const articulo of this.#articulos) {
            total += articulo.getSubtotal();
        }
        var pie = `
            <tfoot>
                <tr>
                    <td colspan="4" align="right">Total</td>
                    <td align="center">${total}</td>
                </tr>
            </tfoot>
        `;
        var contenido = cabecera + cuerpo + pie;
        document.getElementById("parrafoPrincipal").innerHTML = `<table border="1">` + contenido + `</table>`;

    }
}

class Main {
    static main() {
        var cesta = new Cesta(
            new Articulo(1, "Art1", 12.41, 21),
            new Articulo(2, "Art2", 7.2, 51),
            new Articulo(3, "Art3", 50.00, 26)
        );

        cesta.mostrar();

        let menu = function() {
            var entrada = 0;
            var salir = false;
            while (salir == false) {
                entrada = prompt(`
                Escoja una opción:
                1. Insertar un articulo.
                2. Borrar un artículo.
                3. Vaciar cesta.
                4. Salir del menú.
                `);
    
                switch (parseInt(entrada)) {
                    case 1:
                        cesta.insertar();
                        cesta.mostrar();
                        break;
                    case 2:
                        cesta.eliminar();
                        cesta.mostrar();
                        break;
                    case 3:
                        cesta.vaciar();
                        cesta.mostrar();
                        break;
                    case 4:
    
                        break;
                    default:
                        alert("Error: Debe introducir una de las 5 opciones presentadas.");
                        continue;
                }
                salir = true;
            }
        }

        var botonMenu = document.getElementById("botonMenu");
        botonMenu.addEventListener('click', menu);
    }
}