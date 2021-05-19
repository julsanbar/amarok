import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  uri: String = 'http://localhost:8080/';

  crearUsuario(usuario: Usuario): any{

    return this.http.post(this.uri+"crear",usuario);

  }

  iniciarUsuario(usuario: Usuario): any{

    return this.http.post(this.uri+"iniciar",usuario);

  }

}
