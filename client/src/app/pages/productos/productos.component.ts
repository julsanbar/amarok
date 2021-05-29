import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from "../../services/producto/producto.service";
import { first } from 'rxjs/operators';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/pedido.model';
import { RolService } from 'src/app/services/rol/rol.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private formBuilder: FormBuilder,public rolService: RolService,private pedidoService: PedidoService,public carritoService: CarritoService,private productoService: ProductoService ,private route: ActivatedRoute, private router: Router, private sessionService: SesionService) {}

  public visualizaCarrito: any[] = [];
  public productos: Producto[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 6;
  public pedido: Pedido = new Pedido();

  public registroForm!: FormGroup;


  ngOnDestroy(): void {
    
    this.sessionService.removeCategoriaTabla();

    /*if(this.carritoService.existCarrito()){

      this.carritoService.eliminar();

    }*/
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({

      cantidad: [null,
        [
          Validators.min(1),
          Validators.pattern(/^[1-9]\d*$/)
        ]
      ]
    
    });

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 6) || 1;

      switch (this.sessionService.getCategoriaTabla()) {
        case "todas":
            
          this.getDatos(this.page);
        
        break;

        case "competicion":
            
          this.getDatosCompeticion(this.page);
        
        break;

        case "fuego":
            
          this.getDatosFuego(this.page);
        
        break;

        case "seguridad":
            
          this.getDatosSeguridad(this.page);
        
        break;

        case "defensa":
            
          this.getDatosDefensa(this.page);
        
        break;
      
        default:

          this.getDatos(this.page);

        break;
      }

    });

  }

  carritoSelec(producto: Producto): void{

    const cantidadCarrito: number = this.registroForm.get('cantidad')?.value;

    if((cantidadCarrito === 0) || (cantidadCarrito === undefined) || (cantidadCarrito === null)){

      Swal.fire({
        title: 'Cantidad de productos errónea.',
        text: 'La cantidad seleccionada debe ser mayor que cero.',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Cerrar'
      });

      this.registroForm.invalid;

    }else{

      if(producto.stock < cantidadCarrito){

        Swal.fire({
          title: 'Cantidad de productos errónea.',
          text: 'No puede seleccionar una cantidad mayor que la existente en el stock.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }else{

        for (let i = 0; i < cantidadCarrito; i++) {

          this.carritoService.guardar(producto);
    
        }
  
        Swal.fire({
          title: 'Seleccionado '+cantidadCarrito+' de '+producto.nombre,
          text: 'Vaya a Mi Carrito para finalizar o modificar tu compra.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }

      this.registroForm.reset();

    }
  
  }

  categoria(event: any): void{

    switch ((event.target.firstChild.nodeValue)) {
      case "Competición":

        this.sessionService.creaCategoriaTabla("competicion");

      break;
    
      case "Todas":

        this.sessionService.creaCategoriaTabla("todas");

      break;

      case "Fuego":

        this.sessionService.creaCategoriaTabla("fuego");

      break;

      case "Seguridad":

        this.sessionService.creaCategoriaTabla("seguridad");

      break;

      case "Defensa":

        this.sessionService.creaCategoriaTabla("defensa");

      break;
    }

    location.href = "producto";

  }

  trackByItems(index: number, item: any): number { return item.id; }

  getDatosCompeticion(page: number): void {
  
    this.productoService.getPaginationCompeticion(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      this.total = res.docs.totalDocs;

    });

  }

  getDatosFuego(page: number): void {
  
    this.productoService.getPaginationFuego(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      this.total = res.docs.totalDocs;
      
    });

  }

  getDatosSeguridad(page: number): void {
  
    this.productoService.getPaginationSeguridad(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      this.total = res.docs.totalDocs;
      
    });

  }

  getDatosDefensa(page: number): void {
  
    this.productoService.getPaginationDefensa(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      this.total = res.docs.totalDocs;
      
    });

  }

  getDatos(page: number): void {
  
    this.productoService.getPagination(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      this.total = res.docs.totalDocs;
      
    });

  }

  pageChanged(page: any): void{
    this.page = page;

    const queryParams: Params = {page};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      }
    );

    this.getDatos(this.page);
  }

  pagar():void{

    if((this.rolService.devuelveRolSesion() === 'registrado') || (this.rolService.devuelveRolSesion() === 'empleado')){

      let referencias: Number[] = [];
      let stocks: any = {};
      const carrito:any = this.carritoService.devuelve();
      const arreglo: any[] = JSON.parse(carrito);
      let cantidad:any = {};
      let noStock: any[] = [];

      for (const iterator of arreglo) {
        
        const referencia = iterator.referencia;
        const stock = iterator.stock;

        referencias.push(referencia); 

        stocks[referencia] = {stock};

      }

      referencias.forEach(function(i:any) { cantidad[i] = (cantidad[i]||0) + 1;});

      for (const iterator in cantidad) {
        
        if(cantidad[iterator] > stocks[iterator].stock){

          noStock.push(iterator);

        }

      }

      if(noStock.length > 0){

        Swal.fire({
          title: 'Error en la compra',
          text: 'Ha seleccionado más productos de los existentes en el stock.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

        this.carritoService.eliminar();

      }else{

        this.pedido.productos = referencias;
        const id: string|null = this.sessionService.getUsuarioLogeado();

        this.pedidoService.crearPedido(this.pedido,id).pipe(first()).subscribe((res: any) => {

          //console.log(res)

          if(!res.error){

            Swal.fire({
              title: '¡Compra realizada!',
              text: 'Su compra se ha realizado con éxito, ya puede ver su pedido en la sección pedidos',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Cerrar'
            });

          }else{

            Swal.fire({
              title: 'Error en la compra',
              text: res.error,
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'Cerrar'
            });

          }

          this.carritoService.eliminar();

          const currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);

        });

      }

    }/*else{

      Swal.fire({
        title: 'Acceso denegado',
        text: 'Los administradores pueden comprar.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Cerrar'
      });

      this.carritoService.eliminar();

    }*/

  }

  cancelarCarrito():void{

    this.carritoService.eliminar();

  }

  cargaCarrito():void{

    /*if(this.carritoService.existCarrito() === false){

      Swal.fire({
        title: 'Vaya...',
        text: 'No puede realizar el pago ya que no ha seleccionado ningún producto.',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Cerrar'
      });

    }else{

      const carrito:any = this.carritoService.devuelve();
      this.visualizaCarrito = JSON.parse(carrito);
      
      //FALTA CANTIDADES


    }*/

    const carrito:any = this.carritoService.devuelve();
    this.visualizaCarrito = JSON.parse(carrito);




  }

  resetaCantidad(event:any){

    if((event.target.value) || (event.target.value !== undefined) || (event.target.value !== null)){

      event.target.value = '';

    }


  }

}
