function entrada() {
    /* Registrar zonas y temps de cada zona
         "siguiente zona", "finalizar"
         - almacenar en matriz de dos dimensiones
         (las filas son las zonas)
         - solo temps positivas
         - mostrar medias de cada zona y media total
         [Zona[temperaturas]]
    */
    var entrada = 0;
    var zona = 0;
    var terminar = false;
    // Para las zonas
    while (terminar) {
        entrada = prompt("introduzca un numero");
        // Para las temp de cada zona
        while (true) {
            if (entrada == "s") {
                zona++;
                break;
            }
            if (entrada == "f") {
                return
            }
        }
    }
};
