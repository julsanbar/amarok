import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from 'src/app/models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(
    private http: HttpClient
  ) { }

  uri: String = 'http://localhost:8080/';

  getPaginationProveedores(pagina: number): any{

    return this.http.get(this.uri+'getPaginationProveedores/'+pagina);
  }

  modificaProveedor(proveedor: any): any{

    return this.http.post(this.uri+'modificaProveedor',proveedor);
  }

  crearProveedor(proveedor: Proveedor): any{

    return this.http.post(this.uri+'crearProveedor',proveedor);
  }

}
