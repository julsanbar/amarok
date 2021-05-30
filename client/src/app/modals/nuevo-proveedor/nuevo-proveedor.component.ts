import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {

  public registroForm!: FormGroup;
  public errores: any[] = [];

  constructor(private formBuilder: FormBuilder,private proveedorService: ProveedorService) { }

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({

      nombre: ['',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(2)
      ]
    ],
      cif: ['',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]
    ],
      direccionPostal: ['',
      [
        Validators.required
      ]
    ],
      codigoPostal: ['',
      [
        Validators.required
      ]
    ],
      email: ['',
      [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]
    ],
      telefono: ['',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(9),
        Validators.maxLength(15)
      ]
    ],
      pais: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
    ],
      habilitado: [true,
      [
      ]
    ]
    });

  }

  enviar(){

    //console.log(this.registroForm.value)

    let proveedor: Proveedor = this.registroForm.value;

    //console.log(proveedor)

    this.proveedorService.crearProveedor(proveedor).pipe(first()).subscribe((res: any) => {        
      
      console.log(res)

      if(!res.error){

        this.errores.length = 0;

        Swal.fire('Operación correcta', 'Se ha creado correctamente el proveedor', 'success');

      }else{

        this.registroForm.invalid;
        this.errores = res.error;

      }


    }, (err: any) => {
    
      console.log(err)

    });

  }

}
