// Clase Producto, usada para instanciar productos. Atributos privados, usamos un método para ver los valores fuera de la clase
class Producto {
    #cod;
    #nombre;
    #precio;
    #imagen;

    constructor(cod, nombre, precio, imagen) {
        this.#cod = cod;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#imagen = imagen;
    }

    mostrar() {
        return {
            cod: this.#cod,
            nombre: this.#nombre,
            precio: this.#precio,
            imagen: this.#imagen,
        };
    }
}

// Estamos haciendo una "recreación" de una consulta a la base de datos. Se que las variables globales son mala práctica, pero lo hago por simplicar el código
// Dentro de esta constante, instanciamos varios Productos 
const productos = [
    new Producto(
        1,
        "Renault Megane",
        15000,
        "https://source.unsplash.com/random/400x400/?renault-megane"
    ),
    new Producto(
        2,
        "Vestido Rojo",
        29.99,
        "https://source.unsplash.com/random/400x400/?red-dress"
    ),
    new Producto(
        3,
        "Taza café",
        6.99,
        "https://source.unsplash.com/random/400x400/?cup-coffee"
    ),
    new Producto(
        4,
        "Cámara reflex",
        699.99,
        "https://source.unsplash.com/random/400x400/?canon-camera"
    ),
    new Producto(
        5,
        "Iphone 8",
        299.99,
        "https://source.unsplash.com/random/400x400/?iphone-8"
    ),
    new Producto(
        6,
        "PlayStation 5",
        499.99,
        "https://source.unsplash.com/random/400x400/?playstation-5"
    )
];

// Clase Cesta. Clase encargada de gestionar tanto la cesta de la compra como de almacenar en local los datos del carrito
class Cesta {
    #arrayCesta = [];
    #productosExistentes = [];

    // Definimos un constructor que: añade al array de "productos existentes" la variable "productos" y,
    // de existir datos almacenados en el navegador, los cargue y los muestre en la tabla
    constructor() {
        this.#productosExistentes = productos;
        this.#datosLocales();
    }


    // Nota: tanto enviarCesta como agregarProducto se pueden unificar en una sola función, pero por falta de tiempo las dejo separada.
    // Esta separación se debe a que originalmente el método enviarCesta estaba declarado en la clase contProductos, pero como solo debería estar el método
    // encargado de generar el contenido dinamico, introduje este método aquí.
    enviarCesta(idBoton) {
        let cantidad = document.querySelector(
            "input[data-iduni='" + idBoton + "']"
        );
        let productoEscogido = this.#productosExistentes.find(
            (producto) => producto.mostrar().cod === idBoton
        );

        if (productoEscogido && cantidad.value > 0) {
            this.#agregarProducto(productoEscogido, parseInt(cantidad.value));
        }
    }

    #agregarProducto(producto, cantidad) {
        const productoInsertado = this.#arrayCesta.find(
            (item) => item.id === producto.mostrar().cod
        );

        if (productoInsertado) {
            productoInsertado.cantidad += cantidad;
        } else {
            this.#arrayCesta.push({ id: producto.mostrar().cod, cantidad });
        }

        // Cargamos la tabla de nuevo, ahora con los datos del nuevo producto
        this.#renderizarCesta();

        // Guardamos los datos en el localStorage
        this.#almacenarDatos();
    }

    #eliminarProducto(producto) {
        // Buscamos el índice del primer producto con dicho  id en this.#arrayCesta
        const indice = this.#arrayCesta.findIndex(
            (objeto) => objeto.id === producto.mostrar().cod
        );

        // Verificar si el producto está en la cesta (-1 = no se encuentra)
        if (indice !== -1) {
            // Eliminar el producto del array
            this.#arrayCesta.splice(indice, 1);

            // Guardamos los datos actuales
            this.#almacenarDatos();

            // Renderizar la cesta actualizada
            this.#renderizarCesta();
        }
    }

    #calcularTotales() {
        // Creamos una variable contenedora con el total
        let total = 0;

        // Iteramos dentro del arrayCesta, y si existe productos
        this.#arrayCesta.forEach((objeto) => {
            let producto = productos.find(
                (producto) => producto.mostrar().cod === objeto.id
            );
            if (producto) {
                total += producto.mostrar().precio * objeto.cantidad;
            }
        });

        let totalConIVA = total * 1.21;

        document.getElementById("total").innerText = total.toFixed(2);
        document.getElementById("totalIVA").innerHTML = "<strong>" + totalConIVA.toFixed(2) + "</strong>";
    }

    // Método usado para cargar los datos del localStorage. Usado para que el usuario no pierda la información de su compra
    #datosLocales() {
        // obtenemos los datos
        var data = localStorage.getItem("carroCompra");
        var datosGuardados = JSON.parse(data);

        // Si existen datos almacenados en el navegador, los añade al arrayCesta y mostramos el contenido
        if (datosGuardados != null) {
            this.#arrayCesta = datosGuardados;

            // Mostramos la información almacenada en el carrito
            this.#renderizarCesta();
        }
    }

    // Método encargado de ir almacenando el carrito en el localStorage del navegador
    #almacenarDatos() {
        // Primero que todo, declaramos variable donde almacenamos la cadena
        var carrito = JSON.stringify(this.#arrayCesta);

        // Añadimos el objeto JSON al localStorage, añadiendole un nombre descriptivo
        localStorage.setItem("carroCompra", carrito);
    }

    // Método encargado de renderizar la cesta de la compra
    #renderizarCesta() {
        let cestaCompra = document.getElementById("cestaCompra");
        cestaCompra.innerHTML = "";

        this.#arrayCesta.forEach((objeto) => {
            let producto = this.#productosExistentes.find(
                (producto) => producto.mostrar().cod === objeto.id
            );

            if (producto) {
                let subtotal = producto.mostrar().precio * objeto.cantidad;

                let fila = document.createElement("tr");
                fila.innerHTML = `
                      <td>${producto.mostrar().cod}</td>
                      <td>${producto.mostrar().nombre}</td>
                      <td>${objeto.cantidad}</td>
                      <td>${producto.mostrar().precio.toFixed(2)}</td>
                      <td>${subtotal.toFixed(2)}</td>
                      <td><button class="btn btn-danger" id="botonDel-${producto.mostrar().cod
                    }">X</button></td>
                  `;

                cestaCompra.appendChild(fila);

                // Creamos un evento especifico para el botón, ligado al método eliminarProducto.
                let botonEliminar = document.getElementById(`botonDel-${producto.mostrar().cod}`);
                botonEliminar.addEventListener("click", this.#eliminarProducto.bind(this, producto));

            }
        });

        // Una vez que hayamos mostrado todos los datos de la tabla, invocamos al método calcularTotales para g
        this.#calcularTotales();
    }
}

// Clase ContProductos. Clase encargada de mostrar todos los artículos disponibles de forma dinamica.
class ContProductos {
    #arrayProductos = [];
    #cesta = new Cesta();

    constructor() {
        this.#arrayProductos = productos;
        this.#mostrarProductos(this.#arrayProductos);
    }

    // Esta función mostrará tantos productos como instancias de producto haya en la constante "productos"
    // Nota: me he guiado del guión de la tarea del tema 8 para asignarle un estilo parecido.
    #mostrarProductos(arrayProductos) {
        arrayProductos.forEach((producto) => {
            let infoProducto = producto.mostrar();
            let divContenedor = document.getElementById("zonaDinamica");
            let divProductos = document.createElement("div");
            divProductos.classList.add('card', 'col-sm-4');
            let productoCard = document.createElement("div");
            productoCard.classList.add('card-body');

            let imagen = document.createElement("img");
            imagen.src = infoProducto.imagen;
            imagen.className = "img-fluid";

            let nombre = document.createElement("h5");
            nombre.innerHTML = "<b>" + infoProducto.nombre + "</b>";
            nombre.className = "card-title";

            let precio = document.createElement("p");
            precio.innerText = infoProducto.precio + "€";
            nombre.className = "card-text";

            let input = document.createElement("input");
            input.setAttribute("data-iduni", infoProducto.cod);
            input.setAttribute("type", "number");
            input.setAttribute("value", "1");
            input.classList.add("form-control", "mb-2");
            input.style.width = "70px";

            let boton = document.createElement("button");
            boton.className = "btn btn-primary";
            boton.innerText = "Añadir";
            boton.setAttribute("data-idbot", infoProducto.cod);
            boton.addEventListener("click", () => {
                this.#cesta.enviarCesta(infoProducto.cod);
            });

            productoCard.appendChild(imagen);
            productoCard.appendChild(nombre);
            productoCard.appendChild(precio);
            productoCard.appendChild(input);
            productoCard.appendChild(boton);
            divProductos.appendChild(productoCard);
            divContenedor.appendChild(divProductos);
        });
    }
}
// Cargamos el evento de tipo load
window.addEventListener("load", () => new ContProductos());