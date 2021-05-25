import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  token: string = "carrito";

  guardar(producto: Producto):void{

    let productos: any[] =  [];
    const dev: any = this.devuelve();

    if(dev !== null){

      productos = JSON.parse(dev);
   
    }

    productos.push(producto);

    sessionStorage.setItem(this.token,JSON.stringify(productos));

  }

  devuelve():any{

    return sessionStorage.getItem(this.token);

  }

  eliminar():void{

    sessionStorage.removeItem(this.token);

  }

  existCarrito():boolean{
    
    return sessionStorage.getItem(this.token) !== null;

  }

}
