import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario-pedido',
  templateUrl: './usuario-pedido.component.html',
  styleUrls: ['./usuario-pedido.component.css']
})
export class UsuarioPedidoComponent implements OnInit {

  @Input() usuarioPedido: Usuario = new Usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
