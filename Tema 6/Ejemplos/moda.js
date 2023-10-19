/* Posibles casos
   
   Dado un array de valores, sacar la moda.

   1. No hay moda.
   2. Hay una única moda.
   3. Hay más de una moda:
    3.1. Con adyacencia: Es la media de las dos.
    3.2. Sin adyacencia: Son las dos.
*/

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

var values = [1, 2, 2, 3, 4, 5, 2];
console.log(values);
