import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  user!: any;
  token: string = 'auth';

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


}
