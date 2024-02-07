/*
    Interfaz que define los métodos para el manejo de botones
*/
interface ManejoBotones {
	add(): void;
	rest(): void;
}

/*
    Clase Boton que será instanciada
*/
class Boton {
	constructor(private numBoton: number) {
		const btn = $("<button>")
			.text(`Botón ${numBoton}`)
			.on("click", () => {
				alert(`Este es el botón ${numBoton}`);
			});
		$("#botones").append(btn);
	}
}

/*
    Clase GrupoBotones
*/
class GrupoBotones implements ManejoBotones {
	private contador: number = 0;
	add(): void {
		this.contador++;
		new Boton(this.contador);
	}
	rest(): void {
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
	}
}

/*
    document.ready (cuando se cargue el documento)
    Aquí se añaden los eventos a los botones de añadir y restar
*/
$(function () {
	var grupoBot: GrupoBotones = new GrupoBotones();
	$("#botonAdd").on("click", () => {
		grupoBot.add();
	});
	$("#botonRest").on("click", () => {
		grupoBot.rest();
	});
});
