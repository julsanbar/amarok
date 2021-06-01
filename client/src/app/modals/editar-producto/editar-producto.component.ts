import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor.model';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit, OnChanges {

  @Input() editaProducto!: Producto;
  public registroForm!: FormGroup;
  public errores: any[] = [];
  public proveedores!: Proveedor[];
  public seleccion: String[] = [];
  public colores: number[] = [];

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, private proveedorService: ProveedorService) { }


  ngOnChanges(changes: SimpleChanges): void {
    
    this.cargaProveedores();

    this.registroForm = this.formBuilder.group({

      nombre: ['',
        [
          Validators.pattern(/^[a-zA-Z0-9 ]+$/),
          Validators.minLength(3)
        ]
      ],
      categoria: ['',
        [
        ]
      ],
      precio: ['',
        [
          Validators.min(0)
        ]
      ],
      tasa: ['',
        [
          Validators.pattern(/^\d+$/)
        ]
      ],
      stock: ['',
        [
          Validators.pattern(/^\d+$/)
        ]
      ],
      descripcion: ['',
        [
          Validators.minLength(5),
          Validators.maxLength(300)
        ]
      ],
      stockMinimo: ['',
        [
          Validators.pattern(/^\d+$/)
        ]
      ],
      habilitado: ['',
        [

        ]
      ]
    });

  }

  ngOnInit(): void {
  }

  cargaProveedores(): void{

    this.proveedorService.getProveedoresHabilitados().pipe(first()).subscribe((res: any) => {

      //this.proveedores = res.proveedores;
      const aux = res.proveedores;

      if(this.editaProducto.proveedores !== undefined){

        this.proveedores.length = 0;

        for (const iterator of aux) {
          
          if(this.editaProducto.proveedores.indexOf(iterator.referencia) === -1){

            this.proveedores.push(iterator);    

          }

          //console.log('****',iterator)

        }


      }else{

        this.proveedores = aux;

      }

      //console.log(aux)
      //console.log('-------',this.editaProducto.proveedores)


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

    document.getElementById("tablaProductoProveedoresEdita")?.getElementsByTagName("tr")[index].setAttribute("style","background: rgba(36, 154, 158, 0.233)!important;");
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

    document.getElementById("tablaProductoProveedoresEdita")?.getElementsByTagName("tr")[index].removeAttribute("style");

    //console.log(this.seleccion)

  }

  limpiarProveedores(): void{

    if(this.seleccion !== undefined){

      this.seleccion.length = 0;

      for (const iterator of this.colores) {
        
        document.getElementById("tablaProductoProveedoresEdita")?.getElementsByTagName("tr")[iterator].removeAttribute("style");

      }

      this.colores.length = 0;

    }

    //console.log(this.seleccion)

  }

  trackByItems(index: number, item: any): number { return item.id; }

  enviar(){
    
    //stock minimo en el back 

    //let nuevoProducto: Producto = this.registroForm.value;
    //nuevoProducto.proveedores = this.seleccion;

    const productoNuevo: any = {};
    const campos: string[] = ['categoria','descripcion','habilitado','nombre','precio','stock','stockMinimo','tasa'];
    let actualiza: boolean = false;
    productoNuevo.id = this.editaProducto._id;

    campos.forEach(campo => { if(this.registroForm.get(campo)?.value !== ''){ productoNuevo[campo] = this.registroForm.get(campo)?.value; actualiza = true;} });

    //console.log(this.seleccion)

    if(this.seleccion.length !== 0){

      this.editaProducto.proveedores.forEach(element => this.seleccion.push(element));
      productoNuevo.proveedores = this.seleccion;
      actualiza = true;

    }

    //console.log(productoNuevo);
    //console.log(actualiza);

    if(actualiza){

      this.productoService.modificaProducto(productoNuevo).pipe(first()).subscribe((res: any) => {

        if(!res.error){

          this.errores.length = 0;
          Swal.fire('Actualización realizada', 'El usuario se ha actualizado correctamente', 'success');

          //this.reload.emit();

        }else{

          this.registroForm.invalid;
          this.errores = res.error;
  
        }


      }, (err: any) => {
        
        console.log(err)

      });


    }else{
      
      Swal.fire({
        title: 'Vaya...',
        text: 'No ha introducido ningún nuevo valor!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Cerrar'
      });

    }

  }

}