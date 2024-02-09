/*
    Ejemplo 14.6: Módulo mysql
    Crear tabla
*/

/*
    Import del método createConnection de mysql
    para poder crear conexiones
*/
import { createConnection } from 'mysql';

/*
    Parámetros de la conexión
*/
var con = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tema10"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
  // Crea tabla ...
  var sql = "CREATE TABLE IF NOT EXISTS alumnos (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tabla creada"); 
  });
  // Inserta registro ...
  var sql = "INSERT INTO alumnos (name, address) VALUES ('Juan', 'Avda Herrera Oria')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 registro insertado");
  });
  con.end(); // Cierra conexión ...
});