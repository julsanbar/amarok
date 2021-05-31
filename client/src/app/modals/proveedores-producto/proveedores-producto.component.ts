import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-proveedores-producto',
  templateUrl: './proveedores-producto.component.html',
  styleUrls: ['./proveedores-producto.component.css']
})
export class ProveedoresProductoComponent implements OnInit, OnChanges {

  @Input() proveedores!: Proveedor[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    //console.log(this.proveedores.length === 0)

  }

  ngOnInit(): void {

  }

  trackByItems(index: number, item: any): number { return item.id; }

}
