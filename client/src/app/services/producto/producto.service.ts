import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient
  ) { }

  uri: String = 'http://localhost:8080/';

  productosMasVendidos(): any{
    
    return this.http.get(this.uri+'masVendidos');

  }

  getPagination(pagina: number): any{

    return this.http.get(this.uri+'pagination/'+pagina);
  }

  getPaginationCompeticion(pagina: number): any{

    return this.http.get(this.uri+'paginationCompeticion/'+pagina);
  }

  getPaginationFuego(pagina: number): any{

    return this.http.get(this.uri+'paginationFuego/'+pagina);
  }

  getPaginationDefensa(pagina: number): any{

    return this.http.get(this.uri+'paginationDefensa/'+pagina);
  }

  getPaginationSeguridad(pagina: number): any{

    return this.http.get(this.uri+'paginationSeguridad/'+pagina);
  }

  getPaginationProductos(pagina: number): any{

    return this.http.get(this.uri+'getPaginationProductos/'+pagina);
  }

  crearProducto(producto: Producto): any{

    return this.http.post(this.uri+'crearProducto',producto);
  }

  modificaProducto(producto: any): any{

    return this.http.post(this.uri+'modificaProducto',producto);
  }

}
