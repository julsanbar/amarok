import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { ProductoService } from "../../services/producto/producto.service";
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { first } from 'rxjs/operators';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { RolService } from 'src/app/services/rol/rol.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent implements OnInit {

  constructor(private rolService: RolService ,private sessionService: SesionService, 
    private pedidoService: PedidoService, private productoService: ProductoService, 
    private route: ActivatedRoute, private router: Router,
    private usuarioService: UsuarioService) { }

  public pedidos: Pedido[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 10;

  public productos: any[] = [];
  public referencias: Number[] = [];

  public pedidoEditar!: Pedido;
  public rolUsuario!: string|null;
  public pedidoCancelar!: Pedido;

  //public usuarioPedido!: {String:String};

  ngOnInit(): void {

    this.rolUsuario = this.rolService.devuelveRolSesion();

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getDatos(this.page);
    });

  }

  /*usuario(ref: String): String{

    this.usuarioService.usuarioPedido(ref).pipe(first()).subscribe((res: any) => {

      
    });

    return 'holi';

  }*/

  getDatos(page: number): void {

    this.pedidoService.paginationPedidosAdmin(page).pipe(first()).subscribe((res: any) => {

      this.pedidos = res.docs.docs;
      this.total = res.docs.totalDocs;

    });

  }

  pageChanged(page: any): void {
    this.page = page;

    const queryParams: Params = { page };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      }
    );

    this.getDatos(this.page);
  }

  descargarFactura(pedido: Pedido): void {

    this.pedidoService.idClientePedido(pedido).pipe(first()).subscribe((res: any) => {

      this.pedidoService.getFactura(res.id, pedido).pipe(first()).subscribe((res: any) => {

        window.open(res.ruta);
  
  
      });

    });

  }

  referenciasProductosPedidos(items: Number[]) {

    this.referencias = items;

    this.pedidoService.getProductosPedidos(this.referencias).pipe(first()).subscribe((res: any) => {

      this.productos = res.productos;

    });

  }

  cancelarPedido(): void {

    this.pedidoService.cancelarPedido(this.pedidoCancelar).pipe(first()).subscribe((res: any) => {

      if(!res.error){

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['gestionPedidos']);

      }else{

        Swal.fire({
          title: 'Error',
          text: res.error,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }

    });


  }


}
