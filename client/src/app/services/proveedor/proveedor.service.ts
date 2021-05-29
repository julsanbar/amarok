import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
