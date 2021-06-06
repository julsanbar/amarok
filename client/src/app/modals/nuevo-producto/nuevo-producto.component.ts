import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto.model';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor.model';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  public registroForm!: FormGroup;
  public errores: any[] = [];
  public proveedores!: Proveedor[];
  public seleccion: String[] = [];
  public colores: number[] = [];

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, private proveedorService: ProveedorService) { }

  ngOnInit(): void {

    this.cargaProveedores();

    this.registroForm = this.formBuilder.group({

      nombre: ['',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9 ]+$/),
          Validators.minLength(3)
        ]
      ],
      categoria: ['',
        [
          Validators.required
        ]
      ],
      precio: ['',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],
      tasa: ['',
        [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]
      ],
      stock: ['',
        [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]
      ],
      descripcion: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(3000)
        ]
      ],
      stockMinimo: ['',
        [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]
      ],
      habilitado: [true,[]
      ]
    }, 
    { validator: this.compareStock('stock', 'stockMinimo') });

  }

  compareStock(stock: string, stockMinimo: string) {
    return (group: FormGroup) => {
      if (group.controls[stock].value >= group.controls[stockMinimo].value) {
        return null;
      } else {
        return { 'stockInvalido': true };
      }
    };
  }

  cargaProveedores(): void{

    this.proveedorService.getProveedoresHabilitados().pipe(first()).subscribe((res: any) => {

      this.proveedores = res.proveedores;
      //console.log(this.proveedores)

    });

  }

  nuevoProveedor(referencia: String, index: number): void{

    if(this.seleccion !== undefined){

      if(!this.seleccion.includes(referencia)){

        this.seleccion.push(referencia);
        this.colores.push(index);

      }

    }else{

      const nuevo: String[] = [referencia];
      const coloresSeleccion: number[] = [index];

      this.seleccion = nuevo;
      this.colores = coloresSeleccion;
    }

    document.getElementById("tablaProductoProveedores")?.getElementsByTagName("tr")[index].setAttribute("style","background: rgba(36, 154, 158, 0.233)!important;");
    //console.log(document.getElementById("tablaProductoProveedores")?.getElementsByTagName("tr")[index])

  }

  quitaProveedor(referencia: String, index: number): void{

    if(this.seleccion !== undefined){

      const indice = this.seleccion.indexOf(referencia);
      const indiceColores = this.colores.indexOf(index);

      if(indice > -1){

        this.seleccion.splice(indice,1);

      }

      if(indiceColores > -1){

        this.colores.splice(indiceColores,1);

      }

    }

    document.getElementById("tablaProductoProveedores")?.getElementsByTagName("tr")[index].removeAttribute("style");

    //console.log(this.seleccion)

  }

  limpiarProveedores(): void{

    if(this.seleccion !== undefined){

      this.seleccion.length = 0;

      for (const iterator of this.colores) {
        
        document.getElementById("tablaProductoProveedores")?.getElementsByTagName("tr")[iterator].removeAttribute("style");

      }

      this.colores.length = 0;

    }

    //console.log(this.seleccion)

  }

  trackByItems(index: number, item: any): number { return item.id; }

  enviar(){
    
    //console.log(this.registroForm.value)
    //console.log(this.seleccion)

    let nuevoProducto: Producto = this.registroForm.value;

    nuevoProducto.proveedores = this.seleccion;

    console.log(nuevoProducto)

    this.productoService.crearProducto(nuevoProducto).pipe(first()).subscribe((res: any) => {        
      
      //console.log(res)

      if(!res.error){

        this.errores.length = 0;
        //this.registroForm.reset();
        //this.limpiarProveedores();

        Swal.fire('Operación correcta', 'Se ha creado correctamente el producto', 'success');

      }else{

        this.registroForm.invalid;
        this.errores = res.error;

      }


    }, (err: any) => {
    
      console.log(err)

    });


  }

}
