import { Injectable } from '@angular/core';
import { SesionService } from "../sesion/sesion.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private sessionService: SesionService, private http: HttpClient) { }

  uri: String = 'http://localhost:8080/';
  token: string = 'authRol';

  getRol(): any{

    const idUsuario: String|null = this.sessionService.getUsuarioLogeado();
    
    return this.http.get(this.uri+"getRol/"+JSON.stringify(idUsuario));

  }

  iniciarRolSesion(rol: string): void{

    sessionStorage.setItem(this.token,rol);

  }

  devuelveRolSesion(): string|null{

    return sessionStorage.getItem(this.token);

  }

  cerrarRol(): void{

    sessionStorage.removeItem(this.token);

  }

}
