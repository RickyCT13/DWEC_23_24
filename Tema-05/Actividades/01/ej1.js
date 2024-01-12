function principal() {
    // Pedir entradas y mostrar todos los datos
    var numeros = [];
    var entrada = 0;
    while(true) {
        entrada = prompt("Introduzca números enteros desde el 0." +
        "\nHaga click en 'Cancelar' o no introduzca ningún valor y pulse enter para salir.");
        if (entrada == null || entrada == "") {
            break;
        }
        if (entrada < 0) {
            alert("Error, debe introducir sólo números positivos.");
            continue;
        }
        numeros.push(parseInt(entrada));
    }
    alert("Entrada de datos finalizada. Procediendo al cálculo.");
    alert("Números introducidos: " + numeros +
    "\nMedia: " + media(numeros) +
    "\nRango: " + rango(numeros));
    var mensaje = moda(numeros);
    alert(mensaje);
}

function averiguarMayor(valores) {
    var mayor = valores[0];
    for (var i = 0; i < valores.length; i++) {
        if (mayor < valores[i]) {
            mayor = valores[i];
        }
    }
    return mayor;
}

function averiguarMenor(valores) {
    var menor = valores[0];
    for (var i = 0; i < valores.length; i++) {
        if (menor > valores[i]) {
            menor = valores[i];
        }
    }
    return menor;
}

function media(valores) {
    var total = 0;
    for (var i = 0; i < valores.length; i++) {
        total += valores[i];
    }
    return ((total / valores.length).toFixed(2));
}

function rango(valores) {
    if (valores.length === 0) {
        return 0;
    }
    var mayor = averiguarMayor(valores);
    var menor = averiguarMenor(valores);
    return mayor - menor;
}

function moda(valores) {
    var numerosFrecuencias = valores.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
    
    var numeros = Object.values(numerosFrecuencias);

    var frecuencias = Object.keys(numerosFrecuencias);

    var frecuenciaMax = averiguarMayor(numeros);

    var modas = frecuencias.filter(num => numerosFrecuencias[num] === frecuenciaMax);

    var mensaje = "";

    if (modas.length === 0) {
        mensaje = "No hay moda (todos los números se repiten una sola vez).";
    }
    else if (modas.length == 1) {
        mensaje = `La moda es: ${modas[0]}`;
    }
    else if (modas[1] - modas[0] === 1) {
        mensaje = `La moda es: ${((parseInt(modas[0]) + parseInt(modas[1])) / 2).toFixed(2)}`;
    }
    else {
        mensaje = `Las modas son: ${modas.join(', ')}`;
    }
    return mensaje;
}