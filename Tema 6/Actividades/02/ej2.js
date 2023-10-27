function Articulo(codigo, nombre, precio, cantidad) {
    this.codigo = codigo,
        this.nombre = nombre,
        this.precio = precio,
        this.cantidad = cantidad,
        this.subtotal = (precio * cantidad)
    this.mostrar = function () {
        var datos = `
        Codigo: ${this.codigo}
        Nombre: ${this.nombre}
        Precio: ${this.precio}
        Cantidad: ${this.cantidad}
        Subtotal: ${this.subtotal}
        `
        console.log(datos);

    }
}

function Cesta(...articulos) {
    this.articulos = [];
    if (articulos !== null) {
        for (var articulo of articulos) {
            this.articulos.push(articulo);
        }
    }
    this.mostrar = function () {
        var cabecera = `
        <thead>
            <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
        </thead>

        `;
        var cuerpo = `<tbody>`;
        for (articulo of this.articulos) {
            cuerpo += `
                <tr align="center">
                    <td>${articulo.codigo}</td>
                    <td>${articulo.nombre}</td>
                    <td>${articulo.precio}</td>
                    <td>${articulo.cantidad}</td>
                    <td>${articulo.subtotal}</td>
                </tr>
            `;
        }
        cuerpo.concat(`</tbody>`);
        var total = 0;
        for (var articulo of this.articulos) {
            total += articulo.subtotal;
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
        document.getElementById("cesta").innerHTML = contenido;
    }
    this.insertar = function () {
        var codigo = prompt("Introduzca el código del artículo.");
        var nombre = prompt("Introduzca el nombre del artículo.");
        var precio = Number(prompt("Introduzca el precio por unidad del artículo."));
        var unidades = Number(prompt("Introduzca las unidades disponibles."));
        var subtotal = precio * unidades;
        var nuevoArticulo = new Articulo(codigo, nombre, precio, unidades, subtotal);
        this.articulos.push(nuevoArticulo);
        this.mostrar();
    }
    this.eliminar = function () {
        var codigo = prompt("Introduzca el código del artículo que desea eliminar.");
        for (var articulo of this.articulos) {
            if (articulo.codigo == codigo) {
                this.articulos.splice(this.articulos.indexOf(articulo), 1);
            }
        }
        this.mostrar();
    }
    this.vaciar = function () {
        this.articulos = [];
        this.mostrar();
    }
}

let cesta = new Cesta(
    new Articulo(123, "Articulo1", 10, 3),
    new Articulo(124, "Artículo2", 5, 3)
);


function menu() {
    var entrada = 0;
    var salir = false;
    while (salir == false) {
        entrada = prompt(`
        Escoja una opción:
        1. Ver cesta
        2. Insertar un articulo
        3. Borrar un artículo
        4. Vaciar cesta
        5. Salir
        `);

        switch (parseInt(entrada)) {
            case 1:
                cesta.mostrar();
                break;
            case 2:
                cesta.insertar();
                break;
            case 3:
                cesta.eliminar();
                break;
            case 4:
                cesta.vaciar();
                break;
            case 5:
                break;
            default:
                alert("Error: Debe introducir una de las 5 opciones presentadas.");
                continue;
        }
        salir = true;
    }
}



