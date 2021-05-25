import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from 'src/app/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient
  ) { }

  uri: String = 'http://localhost:8080/';

  getFactura(idCliente: String|null, pedido: Pedido): any{
    
    return this.http.get(this.uri+'factura/'+idCliente+'/'+JSON.stringify(pedido));

  }

  getPaginationPedidos(page: number, id: string|null): any{
    
    return this.http.get(this.uri+'paginationPedidos/'+page+'/'+id);

  }


  getProductosPedidos(refProductos: Number[]): any{
    
    return this.http.get(this.uri+'getProductosPedidos/'+JSON.stringify(refProductos));

  }

  cancelarPedido(pedido: Pedido): any{
    
    return this.http.post(this.uri+'cancelarPedido',pedido);

  }

  crearPedido(pedido: Pedido,id: string|null): any{

    return this.http.post(this.uri+'crearPedido',{pedido:pedido,id:id});

  }

}
