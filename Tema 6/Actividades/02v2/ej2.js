/**
 * @constructor
 * @param {Number} codigo El código del artículo.
 * @param {String} nombre El nombre del artículo.
 * @param {Number} precio Precio por unidad del artículo.
 * @param {Number} cantidad Las unidades en stock.
 * @returns {Object} El artículo generado.
 */
function Articulo(codigo, nombre, precio, cantidad) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.subtotal = (precio * cantidad);
}

/**
 * @constructor
 * @param  {...any} articulos Los artículos que se deseen añadir a la cesta en el momento de su creación.
 * @returns {Object} La cesta vacía o con artículos ya introducidos.
 */
function Cesta(...articulos) {
    /* Funcionalidad de inicializar la cesta con artículos */
    this.articulos = [];
    if (articulos !== null) {
        for (var articulo of articulos) {
            this.articulos.push(articulo);
        }
    }
    /** Genera una tabla con los datos de cada artículo en la cesta.
     * @method
     */
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
        document.getElementById("tablaArticulos").innerHTML = `<table border="1">` + contenido + `</table>`;
    }
    /** Pide los datos del nuevo artículo y lo añade a la cesta
     * @method
     */
    this.insertar = function () {
        var codigo = parseInt(prompt("Introduzca el código del artículo."));
        var nombre = prompt("Introduzca el nombre del artículo.");
        var precio = Number(prompt("Introduzca el precio por unidad del artículo."));
        var unidades = Number(prompt("Introduzca las unidades disponibles."));
        var subtotal = precio * unidades;
        this.articulos.push(new Articulo(codigo, nombre, precio, unidades, subtotal));
        alert("Artículo insertado con éxito.");
    }
    /** Busca un artículo por código
     * @method
     * @param {Number} codigo El código del artículo que se busca.
     * @returns {Number} El índice del artículo en el array interno o si no se encuentra el artículo.
     */
    this.buscar = function (codigo) {
        for (var articulo of this.articulos) {
            if (articulo.codigo == codigo) {
                return this.articulos.indexOf(articulo);
            }
        }
        return false;
    }

    /** Edita un artículo de la cesta
     * @method
     * @param {Number} codigo El código del artículo previo a la edición.
     */
    this.editar = function(codigo) {
        if (this.buscar(codigo) === false) {
            alert("Error: Artículo no encontrado");
            return;
        }
        var entrada = 0;
        var salir = false;
        indice = this.buscar(codigo);
        while (salir == false) {
            entrada = prompt(`
            Indique el valor que desee editar:
            1. Código.
            2. Nombre.
            3. Precio.
            4. Cantidad.
            5. Finalizar edición.
            `);
            switch(parseInt(entrada)) {
                case 1:
                    this.articulos[indice].codigo = parseInt(prompt("Introduzca el nuevo código del artículo."));
                    break;
                case 2:
                    this.articulos[indice].nombre = prompt("Introduzca el nuevo nombre del artículo.");
                    break;
                case 3:
                    this.articulos[indice].precio = Number(prompt("Introduzca el nuevo nombre del artículo."));
                    break;
                case 4:
                    this.articulos[indice].cantidad = parseInt(prompt("Introduzca el nuevo nombre del artículo."));
                    break;
                case 5:
                    salir = true;
                    break;
                default:
                    alert("Error. Debe introducir una opción válida.");
                    continue;
            }
            
        }
    }

    /** Elimina un artículo de la cesta por código
     * @method
     */
    this.eliminar = function (codigo) {
        
        if (this.buscar(codigo) !== false) {
            this.articulos.splice(this.buscar(codigo), 1);
            alert("Artículo eliminado con éxito.");
        }
        else {
            alert("Error: Artículo no encontrado");
        }
    }
    /** Vacía la cesta.
     * @method
     */
    this.vaciar = function () {
        this.articulos = [];
        alert("Se ha vaciado la cesta.");
    }
}

let cesta = new Cesta(
    new Articulo(123, "Articulo1", 10, 3),
    new Articulo(124, "Artículo2", 5, 3)
);

/** Abre un menú desplegable con opciones para manejar los datos. */
function menu() {
    var entrada = 0;
    var salir = false;
    while (salir === false) {
        entrada = prompt(`
        Escoja una opción:
        1. Insertar un articulo.
        2. Editar un artículo.
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
                var codigo = parseInt(prompt("Introduzca el código del artículo que desea editar."));
                cesta.editar(codigo);
                cesta.mostrar();
                break;
            case 3:
                var codigo = parseInt(prompt("Introduzca el código del artículo que desea eliminar."));
                cesta.eliminar(codigo);
                cesta.mostrar();
                break;
            case 4:
                cesta.vaciar();
                cesta.mostrar();
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



