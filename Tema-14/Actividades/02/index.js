/*
    MongoDB: Conexión con Node.js
*/
import { MongoClient } from 'mongodb';
import express from 'express';
import path from 'path';

const app = express();
const router = express.Router();
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6

/*
    Conexión al cluster
*/
const uri = 'mongodb+srv://ricardomorenocantea13:<password>@cluster0.cj2exnu.mongodb.net/?retryWrites=true&w=majority';

export async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('dwec-tema-14');
        const collection = client.collection('personas');
        
        /*var registros = collection.find({}).toArray(function (err, result) {
            if (err) {
                console.error(err);
            }
            console.log(result);
        });

        return registros;*/
    }
    finally {
        await client.close();
    }
}



/*
    Al entrar en el directorio raíz, muestra index.html
*/
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

/*
    Manejo de solicitud AJAX
*/
router.get('/get', function (req, res) {
    run().catch(error => {
        console.error(error);
    });
});

app.use('/', router);
app.use(express.static(__dirname));//IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log('Escuchando en puerto 3000');