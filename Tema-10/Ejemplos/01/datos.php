<?php

/* 

    datos.php
    Recupera los datos de una base de datos y los devuelve en forma de JSON

*/

header("access-control-allow-origin: *");

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

    // Cambiar JSON que devuelve en función de si hay id en param??
    public function devolverJSON($id) {

        echo json_encode($this->getDatos($id));
    }
}

$id = $_GET['id'] ?? null;

$conexion = new Conexion();

$conexion->devolverJSON($id);

?>
