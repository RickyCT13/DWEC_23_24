class Costes{
        
    constructor(url:string){
    
            this.costesFunction(url); 
    }
    async costesFunction(url:string)  {
        try {
            //----------------------------
            // Completar código aquí
            //----------------------------
            /*$.post(url, {
                ID: $("#ID").val()
            },
            function(obj) {
                $("#datosTabla").html('');
                obj = JSON.parse(obj);
                obj = obj[0];
                $.each(obj.costes, function(index, element) {
                    $("#datosTabla").append(`<tr><th>${obj.costes[index]}</th><td>${obj.costes[element]}</td></tr>`)
                });
            });*/

			var data = {
				ID: $("#ID").val()
			};
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const obj = await response.json();
			$("#datosTabla").html("");
			for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    $("#datosTabla").append(
                        `<tr><th>${key}</th><td>${value}</td></tr>`
                    );
                }
            }
        }catch(error:any){
            $("#datosTabla").html('El ID introducido no existe');
            console.log( error.message);
        } 
    }
}

class TablaCostes {

    private url:string;

    constructor(url:string){
        this.url= url;
        $('form').on('submit',this.instCost.bind(this));
      
    }

    instCost(e:any) {
        e.preventDefault(); // Para no abandonar la página al enviar formulario.
        new Costes(this.url) ;     
    }

}
new TablaCostes('examen recup final 23_24.php');