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

  deshabilitarUsuario(id: any): any{

    return this.http.post(this.uri+"deshabilitar",{id:id});

  }

  perfil(id: any): any{

    return this.http.post(this.uri+"perfil",{id:id});

  }

  modificaPerfil(usuario: any): any{

    return this.http.post(this.uri+"modificaPerfil",usuario);

  }

  paginationUsuariosAdmin(pagina: number): any{

    return this.http.get(this.uri+'paginationUsuariosAdmin/'+pagina);
  }

  paginationUsuariosEmpleado(pagina: number): any{

    return this.http.get(this.uri+'paginationUsuariosEmpleado/'+pagina);
  }

  pedidosUsuario(referencias:String[]):any{

    return this.http.get(this.uri+'pedidosUsuario/'+referencias);
  }

  usuarioPedido(ref: String): any{

    return this.http.get(this.uri+'usuarioPedido/'+ref);
  }

}
