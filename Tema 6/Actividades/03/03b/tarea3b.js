class Articulo {
    #id;
    #nombre;
    #precio;
    #unidades;
    #subtotal;

    constructor(id, nombre, precio, unidades) {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio.toFixed(2);
        this.#unidades = unidades;
        this.#subtotal = (precio * unidades).toFixed(2);
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
        return this.#subtotal;
    }
}

class Cesta {
    #articulos;

    constructor(...articulos) {
        this.#articulos = [];
        if (articulos != null) {
            this.#articulos.concat(articulos);
        }
    }

    getArticulos() {
        return this.#articulos;
    }

    setArticulos(newArticulos) {
        this.#articulos = newArticulos;
    }

    mostrar() {
        var parrafo = document.createElement("p");
        var tabla = document.createElement("table");
        tabla.setAttribute("border", "1");
        var cabeceraTabla = tabla.createTHead();
        
    }


}