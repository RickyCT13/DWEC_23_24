<?php
// Para solicitudes de otros dominios.
header("access-control-allow-origin: *");
//...................................... 

$json = file_get_contents('php://input');
$data = json_decode($json);

// Simula lectura de BBDD
$carterasJson='[{ "id": 1,
    "nombre": "cartera piel vacuno negra",
    "costes":{ "piel": 5,
               "hilo": 0.80,
               "rebaje": 1,
               "pegamento": 0.50,
               "pintura": 0.45,
               "broches": 0.90,
               "cosido": 1,
               "fabricación": 15,
               "embasado": 1}                
},
{    "id": 2,
    "nombre": "cartera piel vacuno azul",
    "costes":{ "piel": 6,
               "hilo": 0.90,
               "rebaje": 1.50,
               "pegamento": 0.70,
               "pintura": 0.50,
               "broches": 0.80,
               "cosido": 1.50,
               "fabricación": 16,
               "embasado": 1.20}                
},
{    "id": 3,
    "nombre": "cartera piel coco",
    "costes":{ "piel": 25,
               "hilo": 1,
               "rebaje": 1,
               "pegamento": 0.70,
               "pintura": 0.80,
               "broches": 1,
               "cosido": 3,
               "fabricación": 20,
               "embasado": 5}               
}]';


$carterasObj = json_decode($carterasJson);

// Devuelve costes (JSON) del ID recibido...

if (($data->ID)<= count($carterasObj)){
    echo json_encode($carterasObj[$data->ID-1]->costes);
}else{
    echo 'No existe';
}
?>
