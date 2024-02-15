/*
    Actúa como un servidor, procesando una solicitud y devolviendo
    una respuesta
*/
/*
    Imports
*/
import express from 'express';
import path from 'path';

const app = express();
const router = express.Router();
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6

/*
    Al entrar en el directorio raíz, muestra index.html
*/
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

/*
    Manejo de solicitud AJAX
*/
router.get('/pagAjax', function (req, res) {

    
    res.json(
        {
            nombre: 'Ricardo',
            apellido: 'Moreno'
        }
    );
});


app.use('/', router);
app.use(express.static(__dirname));//IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log('Escuchando en puerto 3000');