import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

  constructor(private productoService: ProductoService ,private route: ActivatedRoute, private router: Router, private pedidoService: PedidoService) { }
  
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
      //window.scrollTo(0, 0);
    });

    //console.log("POPPPP---",this.productos)

  }

  descargarFactura(): void{

      

      this.pedidoService.getFactura(1,1).pipe(first()).subscribe((res: any) => {

        console.log("CLIENTE---------",res);

        //Create your invoice! Easy!
        //easyinvoice.createInvoice(res, function (result: any) {
          //The response will contain a base64 encoded PDF file
          //console.log(result.pdf);
          
        //});

      });

  }

  getDatos(page: number): void {
  
    this.productoService.getPagination(page).pipe(first()).subscribe((res: any) => {

      this.productos = res.docs.docs;
      this.total = res.docs.totalDocs;
      
      //console.log("DATA-------",this.productos);
      //console.log("TOTAL-------",this.total);

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
