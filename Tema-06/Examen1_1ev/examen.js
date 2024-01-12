function entradaDatos() {
    var dependencias = [];
    var consumos = [];
    var entrada = 0;
    var terminar = false;
    while (terminar == false) {
        while (true) {
            entrada = prompt("Dependencia " + (dependencias.length + 1) +
                ".\nIntroduzca los consumos de las tomas de esta dependencia." +
                "\nPara pasar a una nueva dependencia, introduzca 'd'." +
                "\nPara finalizar la entrada de datos, introduzca 'f'.");
            //Cancelar la entrada de datos.
            if (entrada == null) {
                return;
            }
            // Añadir datos en una nueva dependencia (case insensitive).
            if (entrada == "d" || entrada == "D") {
                break;
            }
            // Almacenar los datos en la dependencia actual y finalizar (case insensitive).
            if (entrada == "f" || entrada == "F") {
                terminar = true;
                break;
            }
            // Controlar que no se introduzcan valores negativos.
            if (entrada < 0) {
                alert("Error. No puede haber consumo negativo. Introduzca un valor válido.");
                continue;
            }
            // Almacenar en cada iteración los consumos de las tomas.
            consumos.push(parseInt(entrada));
        }
        // Introducir los consumos de las tomas en la dependencia actual.
        dependencias.push(consumos);
        // Limpiar el array de consumos para la siguiente iteración.
        consumos = [];
    }
    // Finaliza la entrada.
    alert("Entrada de datos finalizada. Procediendo a mostrar los resultados.");
    // Mostrar los consumos.
    alert("Consumos de cada dependencia:\n" + mostrarConsumos(dependencias));
    // Mostrar los máximos de cada dependencia.
    alert("Consumo individual máximo de cada dependencia:\n" + mostrarMaximos(dependencias));
    // Mostrar qué dependencias han superado el consumo máximo.
    alert("Dependencias que superan en alguna de sus tomas los 2 kWh de consumo: " + dependenciasConsumoSuperado(dependencias));

}


// Devuelve un array con el consumo máximo de cada dependencia.
function calcularMaximos(dependencias) {
    var maximos = [];
    var consumosOrdenados = [];
    for (var i = 0; i < dependencias.length; i++) {
        consumosOrdenados = [].concat(dependencias[i].sort(function (a, b) { return b - a }));
        maximos.push(consumosOrdenados[0]);
    }
    return maximos;
}

/* Devuelve un array de las dependencias que superan en alguna de
sus tomas 2 kWh de consumo. */
function dependenciasConsumoSuperado(dependencias) {
    var dependenciasConsumoSuperado = [];
    var maximosDependencias = calcularMaximos(dependencias);
    for (var i = 0; i < maximosDependencias.length; i++) {
        if (maximosDependencias[i] > 2) {
            dependenciasConsumoSuperado.push(i + 1);
        }
    }
    return dependenciasConsumoSuperado;
}

// Genera el mensaje con los consumos de cada dependencia.
function mostrarConsumos(dependencias) {
    var mensaje = "";
    for (var i = 0; i < dependencias.length; i++) {
        mensaje += ("Dependencia " + (i + 1) + ": " + dependencias[i] + "\n");
    }
    return mensaje;
}

// Genera el mensaje con los máximos de cada dependencia.
function mostrarMaximos(dependencias) {
    var maximos = calcularMaximos(dependencias);
    var mensaje = "";
    for (var i = 0; i < dependencias.length; i++) {
        mensaje += ("Dependencia " + (i + 1) + ": " + maximos[i] + "\n");
    }
    return mensaje;
}