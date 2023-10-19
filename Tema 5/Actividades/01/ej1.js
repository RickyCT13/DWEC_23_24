function principal() {
    // Pedir entradas y mostrar todos los datos
    let valores = [];
    let entrada = 0;
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
    let total = 0;
    for (let i = 0; i < valores.length; i++) {
        total += valores[i];
    }
    return ((total / valores.length).toFixed(2));
}

function rango(valores) {
    if (valores.length === 0) {
        return 0;
    }
    let mayor = valores[0];
    let menor = valores[0];
    for (let i = 0; i < valores.length; i++) {
        if (mayor < valores[i]) {
            mayor = valores[i];
        }

        if (menor > valores[i]) {
            menor = valores[i];
        }
    }
    return mayor - menor;
}

// Caso 1: No hay moda
// Caso 2: Hay una moda
/* Caso 3: Hay más de una (dos):
    si hay adyacencia = media de las dos
    si no = las dos
*/ 

function moda(valores) {
    if (valores.length === 0) {
        return "N/A";
    }
    let moda = [];
    let contadorMax = 0;
    
    
}

function contarOcurrencias(valores, elemento) {
    let ocurrencias = 0;
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] == elemento) {
            ocurrencias++;
        }
    }
    return ocurrencias;
}

function ocurrenciasDeCadaValor(valores) {
    let valoresOcurrencias = new Array(2, valores.length);
    for (let i = 0; i < valores.length; i++) {
        valoresOcurrencias[0][i] = valores[i];
        valoresOcurrencias[1][i] = contarOcurrencias(valores, valores[i]);
    }
    return valoresOcurrencias;
}

/*  [
        [1, 2, 3]
    ]
    
*/