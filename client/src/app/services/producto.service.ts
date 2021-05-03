import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient
  ) { }

  uri: String = 'http://localhost:8080';

  productosMasVendidos(): any{
    /**
     * REVISAR IMPORTACIONE DE HTTP Y EL SERVICIO, REVISAR LO QUE DEVUELVE
     */
    return this.http.get(this.uri+'/').subscribe();

  }

}
