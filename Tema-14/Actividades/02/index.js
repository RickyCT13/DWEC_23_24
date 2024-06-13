/*
    MongoDB: Conexión con Node.js
*/
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import path from 'path';


const app = express();
const router = express.Router();
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6
app.use(express.json());
/*
    Conexión al cluster
*/
const uri = "mongodb+srv://ricardomorenocantea13:ILIgRjGFH84Nlsvq@cluster0.cj2exnu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

/*
    Al entrar en el directorio raíz, muestra index.html
*/
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/addData", async (req, res) => {
    try {
        const { nombre, apellidos } = req.body;
        const db = client.db("dwec-tema-14");
        const collection = db.collection("personas");
        await collection.insertOne({ nombre, apellidos });

        res.send("Documento insertado correctamente");
    }
    catch (error) {
        console.error(error);
        res.send("Error insertando documento");
    }
});

app.get("/getData", async (req, res) => {
    try {
        const db = client.db("dwec-tema-14");
        const collection = db.collection("personas");

        const data = await collection.find({}).toArray();

        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.send("Error al cargar los datos");
    }
});

app.use('/', router);
app.use(express.static(__dirname));//IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log('Escuchando en puerto 3000');