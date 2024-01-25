<?php

/* 

    datos.php
    Recupera los datos de una base de datos y los devuelve en forma de JSON

*/

/*
    Permite solicitudes de otros dominios
*/
header("access-control-allow-origin: *");

/*
    Utilizaremos PDO para acceder a la base de datos.
*/
class Conexion {
    protected $pdo;
    public function __construct() {
        try {
            $dsn = "mysql:host=localhost;dbname=tema10";

            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_PERSISTENT => false,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];

            $this->pdo = new PDO($dsn, "root", '', $options);
        } catch (PDOException $ex) {
            echo 'Error en la base de datos';
            exit();
        }
    }

    /*
        Ejecuta una sentencia SELECT para recuperar el/los registro(s).
        Si la id es nula, se recuperan todos los registros.
        De lo contrario, devuelve el registro deseado.
    */
    public function getDatos($id) {
        $query = "SELECT * FROM datos";

        if ($id !== null) {
            $query .= " WHERE id = :id";
        }

        $pdostmt = $this->pdo->prepare($query);

        if ($id !== null) {
            $pdostmt->bindParam(':id', $id, PDO::PARAM_INT);
        }

        $pdostmt->execute();

        return $pdostmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /*
        Devuelve el json al navegador
    */
    public function devolverJSON($id) {
        echo json_encode($this->getDatos($id));
    }
}

$id = $_GET['id'] ?? null;

$conexion = new Conexion();

$conexion->devolverJSON($id);
