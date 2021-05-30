import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { first } from 'rxjs/operators';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-pedidos-usuario',
  templateUrl: './pedidos-usuario.component.html',
  styleUrls: ['./pedidos-usuario.component.css']
})
export class PedidosUsuarioComponent implements OnInit, OnChanges {

  @Input() pedidos!: Pedido[]|null;
  public productos: any[] = [];
  public referencias: Number[] = [];
  public visualiza!: Pedido[];
  public vacio: boolean = false;

  constructor(private usuarioService: UsuarioService, private pedidoService: PedidoService) { }

  ngOnChanges(changes: SimpleChanges): void {
        
    if(!this.pedidos || this.pedidos.length === 0 || this.pedidos === null){
      
      this.vacio = true;
    
    }else{

      this.vacio = false;
      this.visualiza = this.pedidos;
    
    }

  }

  ngOnInit(): void {
  }

  referenciasProductosPedidos(items: Number[]) {

    this.referencias = items;

    this.pedidoService.getProductosPedidos(this.referencias).pipe(first()).subscribe((res: any) => {

      this.productos = res.productos;

    });

  }


}
