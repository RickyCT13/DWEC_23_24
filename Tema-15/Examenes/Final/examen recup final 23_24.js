"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Costes {
    constructor(url) {
        this.costesFunction(url);
    }
    costesFunction(url) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield fetch(url, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const obj = yield response.json();
                $("#datosTabla").html("");
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        const value = obj[key];
                        $("#datosTabla").append(`<tr><th>${key}</th><td>${value}</td></tr>`);
                    }
                }
            }
            catch (error) {
                $("#datosTabla").html('El ID introducido no existe');
                console.log(error.message);
            }
        });
    }
}
class TablaCostes {
    constructor(url) {
        this.url = url;
        $('form').on('submit', this.instCost.bind(this));
    }
    instCost(e) {
        e.preventDefault(); // Para no abandonar la página al enviar formulario.
        new Costes(this.url);
    }
}
new TablaCostes('examen recup final 23_24.php');
