import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, Output, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Pedido } from 'src/app/models/pedido.model';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { RolService } from 'src/app/services/rol/rol.service';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() importeTotal!: number;
  @Input() visualizaCarrito!: any[];
  public pedido: Pedido = new Pedido();
  @Output() reload = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,public rolService: RolService,private pedidoService: PedidoService,public carritoService: CarritoService,private productoService: ProductoService ,private route: ActivatedRoute, private router: Router, private sessionService: SesionService) {}
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    //console.log(changes)

  }

  trackByItems(index: number, item: any): number { return item.id; }

  descartar(index:Number){

    const carrito:any = this.carritoService.devuelve();
    let arreglo: any[] = JSON.parse(carrito);
    //let carroNuevo:any[] = [];
    let control = false;

    //console.log(item.id)
    this.carritoService.eliminar();

    for (let i = 0; i < arreglo.length; i++) {
      
      if(index !== i){

        //carroNuevo.push(arreglo[i]);
        this.carritoService.guardar(arreglo[i]);

      }

    }

    this.reload.emit();

    /*const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);*/

    //console.log(carroNuevo)

  }



}
