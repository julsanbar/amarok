import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-pedidos-producto',
  templateUrl: './pedidos-producto.component.html',
  styleUrls: ['./pedidos-producto.component.css']
})
export class PedidosProductoComponent implements OnInit, OnChanges {

  @Input() pedidos: Pedido[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    
    

  }

  ngOnInit(): void {
  }

}
