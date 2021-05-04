import { Component, OnInit } from '@angular/core';
import { ProductoService } from "../../services/producto.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {

    this.productoService.productosMasVendidos().subscribe((res:any) => {

      console.log(res.productos);
    });

  }

}
