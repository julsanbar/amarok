import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  token: string = 'auth';
  tabla: string = "categoria";

  iniciar(id: string): void{

    sessionStorage.setItem(this.token,id);

  }

  cerrar(): void{

    sessionStorage.removeItem(this.token);

  }

  getUsuarioLogeado(): string|null{

    return sessionStorage.getItem(this.token);

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

  existeCategoriaTabla(): boolean{

    return sessionStorage.getItem(this.tabla) !== null;

  }



}
