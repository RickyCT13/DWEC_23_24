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
                PDO::ATTR_EMULATE_PREPARES => false
            ];

            $this->pdo = new PDO($dsn, "root", '', $options);
        } catch (PDOException $ex) {
            echo 'Error en la base de datos';
            exit();
        }
    }

    public function getDatos() {
        $query = "SELECT * FROM datos ORDER BY id";

        $pdostmt = $this->pdo->prepare($query);

        $pdostmt->setFetchMode(PDO::FETCH_ASSOC);

        $pdostmt->execute();

        return $pdostmt;
    }

    // Cambiar JSON que devuelve en función de si hay id en param??
    public function devolverJSON() {
        $cadenaJSON = '[';

        foreach ($this->getDatos()->fetchAll() as $registro) {
            $cadenaObj = '{"id":"' . $registro['id'] . '","nombre":"' . $registro['nombre'] . '","apellidos":"' . $registro['apellidos'] . '","ciudad":"' . $registro['ciudad'] . '"}, ';
            $cadenaJSON = $cadenaJSON . $cadenaObj;
        }

        $cadenaJSON = rtrim($cadenaJSON, "\, ");

        $cadenaJSON = $cadenaJSON . "]";

        echo $cadenaJSON;
    }
}

$conexion = new Conexion();

$conexion->devolverJSON();

?>
