<?php

/* 

    datos.php
    Recupera los datos de una base de datos y los devuelve en forma de JSON

*/

header("access-control-allow-origin: *");

$dsn = "mysql:host=localhost;dbname=tema10";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_PERSISTENT => false,
    PDO::ATTR_EMULATE_PREPARES => false
];





$db = new mysqli("localhost", "root", "", "tema10");

$nombre = $_GET['nombre'];

$query = "SELECT * FROM datos WHERE nombre = :nombre;";

$pdostmt = $db->pdo

?>