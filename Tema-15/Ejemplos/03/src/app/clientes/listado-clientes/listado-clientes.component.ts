import { Component, OnInit } from '@angular/core';
import { Cliente, Grupo } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrl: './listado-clientes.component.scss'
})
export class ListadoClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clientesService: ClientesService) {
    this.clientes = this.clientesService.getClientes();
  }

  ngOnInit(): void {
      
  }
}
