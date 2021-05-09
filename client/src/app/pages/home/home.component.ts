import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../models/producto.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  public srcMasVendidos: string[] = [];
  public productosMasVendidos: Producto[] = [];

  constructor(private productoService: ProductoService) { }
  
  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {

    this.imagenesProductosMasVendidos();

  }

  trackByItems(index: number, item: any): number { /*console.log(index+"\n"+item);*/ return item.id; }

  imagenesProductosMasVendidos(): void{

    this.productoService.productosMasVendidos().subscribe((res:any) => {

      for (const producto of res.productos) {

        this.srcMasVendidos.push("../../../assets/img/productos/"+producto.referencia+".jpg");
        this.productosMasVendidos.push(producto);

      }

    });

  }

}
