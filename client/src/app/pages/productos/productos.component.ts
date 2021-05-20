import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from "../../services/producto/producto.service";
import { first } from 'rxjs/operators';
import { PedidoService } from "../../services/pedido/pedido.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges {

  constructor(private productoService: ProductoService ,private route: ActivatedRoute, private router: Router, private pedidoService: PedidoService) {
    
   }
  
  public productos: Producto[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 6;
  
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 6) || 1;
      this.getDatos(this.page);
    });

  }

  descargarFactura(): void{

      this.pedidoService.getFactura(1,1).pipe(first()).subscribe((res: any) => {
        
        window.open(res.ruta);


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
