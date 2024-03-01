import { Component, OnInit } from '@angular/core';
import { Producto } from './producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  productos: Producto[];

  constructor () {
    this.productos = [
      {
        id: 1,
        nombre: "Smartphone",
        precio: 174.99,
        descripcion: "Un móvil",
        imagen: ""
      },
      {
        id: 2,
        nombre: "Arcade Stick",
        precio: 145.00,
        descripcion: "Un periférico diseñado a partir de los controles encontrados en las máquinas recreativas.",
        imagen: ""
      },
      {
        id: 3,
        nombre: "Gafas inteligentes",
        precio: 50.00,
        descripcion: "Gafas graduadas que se convierten en gafas de sol al accionar un mecanismo.",
        imagen: ""
      },
      {
        id: 4,
        nombre: "Smartwatch",
        precio: 125.00,
        descripcion: "Reloj inteligente con tecnología punta que permite conectarse a un dispositivo y controlarlo con gestos físicos.",
        imagen: ""
      },

    ]
  }
  ngOnInit(): void {
      
  }

}
