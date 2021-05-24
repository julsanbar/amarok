import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from "../../services/producto/producto.service";
import { first } from 'rxjs/operators';
import { SesionService } from 'src/app/services/sesion/sesion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private productoService: ProductoService ,private route: ActivatedRoute, private router: Router, private sessionService: SesionService) {}

  public productos: Producto[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 6;

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
