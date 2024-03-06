/*
    MongoDB: Conexión con Node.js
*/
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import path from 'path';

/*
const app = express();
const router = express.Router();
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6
*/
/*
    Conexión al cluster
*/
const uri;


async function run(fun) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('dwec-tema-14');
        const collection = db.collection('personas');

        /*
            Callback que permitirá a otras funciones
            usar el mongoclient.
        */
        await fun(client, db, collection).catch(error => console.error(error));
    }
    finally {
        /*
            Se cierra la conexión sin importar el resultado
        */
        await client.close();
    }
}
async function getAll() {
    run(async function (client, db, collection) {
        /*
            Utilizamos "let" en vez de "const" para que se actualicen
            los valores
        */
        let queryAll = await collection.find();
        let allValues = await queryAll.toArray();
        console.log(allValues);
    });
}
async function create(registro) {
    run(async function (client, db, collection) {
        if (registro != null) {
            await collection.insertOne(registro);
        }
    });
}
getAll();
create({
    nombre: "John",
    apellido: "PHP"
});
getAll();


/*
    Al entrar en el directorio raíz, muestra index.html
*/
/*router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

/*
    Manejo de solicitud AJAX
*/
/*router.get('/get', function (req, res) {
    
});

app.use('/', router);
app.use(express.static(__dirname));//IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log('Escuchando en puerto 3000');*/