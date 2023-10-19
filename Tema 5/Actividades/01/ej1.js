function principal() {
    // Pedir entradas y mostrar todos los datos
    var valores = [];
    var entrada = 0;
    while(true) {
        entrada = prompt("Introduzca números enteros desde el 0");
        if (entrada == null || entrada == "") {
            break;
        }
        if (entrada < 0) {
            alert("Error, debe introducir sólo números positivos.");
            continue;
        }
        valores.push(entrada);
    }
    alert(valores);
    // media rango y moda
}

function media(valores) {
    var total = 0;
    for (var i = 0; i < valores.length; i++) {
        total += valores[i];
    }
    return (total / valores.length);
}

function rango(valores) {
    return (averiguarMayor(valores) - averiguarMenor(valores));
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

// Caso 1: No hay moda
// Caso 2: Hay una moda
/* Caso 3: Hay más de una (dos):
    si hay adyacencia = media de las dos
    si no = las dos
*/ 

function moda(valores) {
    // Contar ocurrencias de todos los numeros
    // Contar la mayor ocurrencia
    var masFrecuente = 0;
    for (var i = 0; i < valores.length; i++) {

    }
}

function contarOcurrencias(valores, elemento) {
    var ocurrencias = 0;
    for (var i = 0; i < valores.length; i++) {
        if (valores[i] == elemento) {
            ocurrencias++;
        }
    }
    return ocurrencias;
}

function ocurrenciasDeCadaValor(valores) {
    var valoresOcurrencias = new Array(2, valores.length);
    for (var i = 0; i < valores.length; i++) {
        valoresOcurrencias[0][i] = valores[i];
        valoresOcurrencias[1][i] = contarOcurrencias(valores, valores[i]);
    }
    return valoresOcurrencias;
}

/*  [
        [1, 2, 3]
    ]
    
*/