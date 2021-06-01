import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Pedido } from 'src/app/models/pedido.model';
import { Producto } from 'src/app/models/producto.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos: Producto[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 10;
  public proveedores: Proveedor[] = [];
  public pedidos: Pedido[] = [];
  public editaProducto: Producto = new Producto;

  constructor(private router: Router, private route: ActivatedRoute, private productoService: ProductoService, 
    private proveedorService: ProveedorService, private pedidoService: PedidoService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getDatos(this.page);
    });

  }

  cargarPedidos(item: Number): void{

    this.pedidoService.pedidosDeProducto(item).pipe(first()).subscribe((res: any) => {

      this.pedidos = res.ped;

    });

  }

  cargarProveedores(items: String[]): void{

    this.proveedorService.proveedoresReferencia(items).pipe(first()).subscribe((res: any) => {

      this.proveedores = res.pro;

    });

  }

  getDatos(page: number): void {

    this.productoService.getPaginationProductos(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      //console.log(this.proveedores)
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

  trackByItems(index: number, item: any): number { return item.id; }


  refresh():void{

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['gestionProductos']);

  }

}
