import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RolService } from 'src/app/services/rol/rol.service';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit, OnChanges {

  //@Output() reload = new EventEmitter<any>();
  @Input() editaUsuario: Usuario = new Usuario();
  public registroForm!: FormGroup;
  public errores: any[] = [];
  public perfil: Usuario = new Usuario();
  public rolUsuario!: string|null;

  constructor(private rolService: RolService,private router: Router ,private sessionService: SesionService ,private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    
    console.log(this.editaUsuario);

    this.rolUsuario = this.rolService.devuelveRolSesion();

    this.perfil = this.editaUsuario;

    this.registroForm = this.formBuilder.group({

      nombre: ['',
      [
        Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/),
        Validators.minLength(3)
      ]
    ],
      tipo: ['',
      [
        
      ]
    ],
      licencia: ['',
      [
        
      ]
    ],
      usuario: ['',
      [
        
        Validators.pattern(/^([a-zA-Z0-9ñáéíóú]+[\s]*)+$/),
        Validators.minLength(5)
      ]
    ],
      codigoPostal: ['',
      [
        
        Validators.pattern(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/)
      ]
    ],
      direccion: ['',
      [
        
        //No debe de contener carácteres especiales
        Validators.pattern(/^[^$%#&|*+@<>.#]*$/),
        Validators.minLength(10)
      ]
    ],
      dni: ['',
      [
        
        Validators.pattern(/^[0-9]{8,8}[A-Za-z]$/)
      ]
    ],
      apellidos: ['',
      [
        
        Validators.pattern(/^(?=.{3,100}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/)
      ]
    ],
      telefono: ['',
      [
        
        Validators.pattern(/^[9|6|7|8]{1}([\d]{2}[-]*){3}[\d]{2}$/)
      ]
    ],
      nacimiento: ['',
      [
        
      ]
    ],
      email: ['',
      [
        
        Validators.email
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
    
    const usuario: any = {};
    const campos: string[] = ['usuario','telefono','nombre','nacimiento','licencia','email','dni','direccion','apellidos','codigoPostal','habilitado','tipo'];
    let actualiza: boolean = false;
    usuario.id = this.perfil._id;

    campos.forEach(campo => { if(this.registroForm.get(campo)?.value !== ''){ usuario[campo] = this.registroForm.get(campo)?.value; actualiza = true;} });

    if(actualiza){
      //console.log(usuario)
      this.usuarioService.modificaPerfil(usuario).pipe(first()).subscribe((res: any) => {

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
