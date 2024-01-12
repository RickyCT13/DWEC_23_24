class Empleado {
    nombre;
    apellidos;
    #edad;

    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.#edad = edad;
    }

    muestra () {
        return `
        Nombre: ${this.nombre}
        Apellido(s): ${this.apellidos}
        Edad: ${this.#edad} años
        `;
    }
}

class Profesor extends Empleado {
    cargo;

    constructor (nombre, apellidos, edad, cargo) {
        super(nombre, apellidos, edad);
        this.cargo = cargo;
    }

    muestraCargo () {
        return super.muestra() + `Cargo: ${this.cargo}
        `;
    }
}

function main() {
    var profesor = new Profesor("Fulanito", "Gómez Pérez", 32, "Jefe de Estudios");
    alert(profesor.muestraCargo());
}
