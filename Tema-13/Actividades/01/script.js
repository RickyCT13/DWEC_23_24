/*
    Clase Boton que será instanciada
*/
var Boton = /** @class */ (function () {
    function Boton(numBoton) {
        this.numBoton = numBoton;
        var btn = $("<button>")
            .text("Bot\u00F3n ".concat(numBoton))
            .on("click", function () {
            alert("Este es el bot\u00F3n ".concat(numBoton));
        });
        $("#botones").append(btn);
    }
    return Boton;
}());
/*
    Clase GrupoBotones
*/
var GrupoBotones = /** @class */ (function () {
    function GrupoBotones() {
        this.contador = 0;
    }
    GrupoBotones.prototype.add = function () {
        this.contador++;
        new Boton(this.contador);
    };
    GrupoBotones.prototype.rest = function () {
        /*
            Establecemos esta condición para evitar botones
            con números negativos o cero.
        */
        if (this.contador > 0) {
            this.contador--;
            /*
                Elimina el último elto. button del elemento
                con id "#botones"
            */
            $("#botones > button:last").remove();
        }
    };
    return GrupoBotones;
}());
/*
    document.ready (cuando se cargue el documento)
    Aquí se añaden los eventos a los botones de añadir y restar
*/
$(function () {
    var grupoBot = new GrupoBotones();
    $("#botonAdd").on("click", function () {
        grupoBot.add();
    });
    $("#botonRest").on("click", function () {
        grupoBot.rest();
    });
});
