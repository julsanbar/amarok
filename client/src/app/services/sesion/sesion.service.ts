import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  user!: any;
  token: string = 'auth';
  tabla: string = "categoria";

  iniciar(usuario: any): void{

    this.user = {

      id: usuario._id,
      tipo: usuario.tipo,
      habilitado: usuario.habilitado

    };

    sessionStorage.setItem(this.token,JSON.stringify(this.user));

  }

  noLogeado(): boolean{

    return !sessionStorage.getItem(this.token);

  }

  creaCategoriaTabla(categoria: string): void{

    sessionStorage.setItem(this.tabla,categoria);

  } 

  getCategoriaTabla(): string|null{

    return sessionStorage.getItem(this.tabla);

  }

  removeCategoriaTabla(): void{

    sessionStorage.removeItem(this.tabla);

  }

}
