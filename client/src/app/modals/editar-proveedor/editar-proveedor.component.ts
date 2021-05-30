import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit, OnChanges {

  @Input() proveedor!: Proveedor;
  public registroForm!: FormGroup;
  public errores: any[] = [];

  constructor(private formBuilder: FormBuilder,private proveedorService: ProveedorService) { }

  ngOnChanges(changes: SimpleChanges): void {
    
    //console.log(this.proveedor)
    
    this.registroForm = this.formBuilder.group({

      nombre: ['',
      [
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(5)
      ]
    ],
      cif: ['',
      [
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]
    ],
      direccionPostal: ['',
      [
        
      ]
    ],
      codigoPostal: ['',
      [
        
      ]
    ],
      email: ['',
      [
        
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]
    ],
      telefono: ['',
      [
        
        Validators.pattern(/^\d+$/),
        Validators.minLength(9),
        Validators.maxLength(15)
      ]
    ],
      pais: ['',
      [
        
        Validators.minLength(2),
        Validators.maxLength(20)
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

  enviar(){

    const proveedorNuevo: any = {};
    const campos: string[] = ['nombre','cif','direccionPostal','codigoPostal','email','telefono','pais','habilitado'];
    let actualiza: boolean = false;

    campos.forEach(campo => { if(this.registroForm.get(campo)?.value !== ''){ proveedorNuevo[campo] = this.registroForm.get(campo)?.value; actualiza = true;} });

    //console.log('****************');
    //console.log(proveedorNuevo)

    if(actualiza){

      proveedorNuevo['_id'] = this.proveedor._id;

      //console.log('****************');
      //console.log(proveedorNuevo)

      this.proveedorService.modificaProveedor(proveedorNuevo).pipe(first()).subscribe((res: any) => {

        if(!res.error){

          this.errores.length = 0;

          Swal.fire('Operación correcta', 'El proveedor se ha actualizado correctamente', 'success');

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
