import { createServer } from 'http';
import { suma } from './miModulo.mjs';
import { Saludo } from './miClase.mjs';

var saludo = new Saludo();
var num1 = 3;
var num2 = 4;
createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`La suma de ${num1} y ${num2} es: ${suma(num1, num2)}`);
  res.write(saludo.hi());
  res.end();
}).listen(8080);