/*
    MongoDB: Conexión con Node.js
*/
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import path from 'path';


const app = express();
const router = express.Router();
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6

/*
    Conexión al cluster
*/
const uri = "mongodb+srv://ricardomorenocantea13:ILIgRjGFH84Nlsvq@cluster0.cj2exnu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function run(fun) {
    try {
        await client.connect();
        const db = client.db('dwec-tema-14');
        const collection = db.collection('personas');

        /*
            Callback que permitirá a otras funciones
            usar el mongoclient.
        */
        return await fun(client, db, collection).catch(error => console.error(error));
        /*let queryAll = collection.find({});
        let allValues = await queryAll.toArray();
        return allValues;*/
    }
    finally {
        /*
            Se cierra la conexión sin importar el resultado
        */
        await client.close();
    }
}
function getAll() {
    let allValues = run(async (client, db, collection) => {
        /*
            Utilizamos "let" en vez de "const" para que se actualicen
            los valores
        */
        let queryAll = await collection.find();
        let allValues = await queryAll.toArray();
        return allValues;
    });
    return allValues;
}

function createDocument(registro) {
    run(async (client, db, collection) => {
        if (registro != null) {
            await collection.insertOne(registro);
        }
    });
}

function deleteDocument(id) {
    run(async (client, db, collection) => {
        await collection.deleteOne({ _id: id });
    });
}


/*getAll();
createDocument({
    nombre: "a",
    apellido: "b"
});
getAll();*/


/*
    Al entrar en el directorio raíz, muestra index.html
*/

router.get('/', function (req, res) {
    
    //res.sendFile(path.join(__dirname, '/index.html'));
});

router.get('/get', async function (req, res) {
    /*
        Cargar index.html
    */
    //res.sendFile(path.join(__dirname + '/index.html'));
    /*
        Devolver datos
    */
    /*getAll().then(data => {
        res.json({
            data: data
        });
    }).catch(err => console.error(err));*/

});

/*
    Manejo de solicitud AJAX
*/
/*router.get('/get', function (req, res) {
    res.json(
        {
            datos: getAll()
        }
    );
});*/

app.use('/', router);
app.use(express.static(__dirname));//IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log('Escuchando en puerto 3000');