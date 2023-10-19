// Declaración de arrays
var myArray = [1, 2, 3];

// Recorrido de un array unidimensional
console.log("Array: ");
for(var i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
}

// Declaración de una matriz bidimensional
var myMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Recorrido de la matriz
console.log("Matriz 3x3: ");
for(var i = 0; i < myMatrix.length; i++) {
    for(var j = 0; j < myMatrix[i].length; j++) {
        console.log(myMatrix[i][j]);
    }
}