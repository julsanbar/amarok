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


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private rolService: RolService,private pedidoService: PedidoService,private carritoService: CarritoService,private productoService: ProductoService ,private route: ActivatedRoute, private router: Router, private sessionService: SesionService) {}

  public productos: Producto[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 6;
  public pedido: Pedido = new Pedido();

  ngOnDestroy(): void {
    this.sessionService.removeCategoriaTabla();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

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

  //COMPROBAR QUE ES REGISTRADO NO EMPLEADO O ADMINISTRADOR
  carrito():void{

    if(this.rolService.devuelveRolSesion() === 'registrado'){

      if(this.carritoService.existCarrito() === false){

        Swal.fire({
          title: 'Vaya...',
          text: 'No puede realizar el pago ya que no ha seleccionado ningún producto.',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }else{

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

            console.log(res)

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
                text: 'Se ha producido un error en la creación del pedido.',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Cerrar'
              });

            }

            this.carritoService.eliminar();

          });

        }

      }
    
    }else{

      Swal.fire({
        title: 'Acceso denegado',
        text: 'Los administradores ni los empleados pueden comprar.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Cerrar'
      });

      this.carritoService.eliminar();

    }

  }

  carritoSelec(producto: Producto): void{

    this.carritoService.guardar(producto);

    Swal.fire({
      title: 'Seleccionado '+producto.nombre,
      text: 'Selecciona pagar en el menú superior para finalizar tu compra.',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Cerrar'
    });

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

}
