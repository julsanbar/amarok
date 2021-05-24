import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../models/usuario.model"
import { UsuarioService } from "../../services/usuario/usuario.service";
import { SesionService } from "../../services/sesion/sesion.service";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public registroForm!: FormGroup;
  public errores: any[] = [];
  public perfil: Usuario = new Usuario();

  constructor(private router: Router ,private sessionService: SesionService ,private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

    this.cargarPerfil();

    this.registroForm = this.formBuilder.group({

      nombre: ['',
      [
        Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/),
        Validators.minLength(3)
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
        
        Validators.pattern(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/)
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
      password: ['',
      [
        
        //[8,15] longitud, no espacios, 1 mayus, 1 minus, 1 especial, 1 num
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%"*?&])([A-Za-z\d$@"$!%*?&]|[^ ]){8,15}$/)
      ]
    ]
    });

  }

  cargarPerfil(){

    const idUsuario: string|null = this.sessionService.getUsuarioLogeado();

    this.usuarioService.perfil(idUsuario).pipe(first()).subscribe((res: any) => {

      this.perfil.usuario = res.datos.usuario;
      this.perfil.telefono = res.datos.telefono;
      this.perfil.nombre = res.datos.nombre;
      this.perfil.nacimiento = res.datos.nacimiento.substring(0,10);
      this.perfil.licencia = res.datos.licencia;
      this.perfil.email = res.datos.email;
      this.perfil.dni = res.datos.dni;
      this.perfil.direccion = res.datos.direccion;
      this.perfil.apellidos = res.datos.apellidos;
      this.perfil.codigoPostal = res.datos.codigoPostal;
      this.perfil.password = res.datos.password;

    }, (err: any) => {
      
      console.log(err)

    });

  }

  enviar(){
    
    const usuario: any = {};
    const campos: string[] = ['usuario','telefono','nombre','nacimiento','licencia','email','dni','direccion','apellidos','codigoPostal','password'];
    let actualiza: boolean = false;
    usuario.id = this.sessionService.getUsuarioLogeado();

    campos.forEach(campo => { if(this.registroForm.get(campo)?.value !== ''){ usuario[campo] = this.registroForm.get(campo)?.value; actualiza = true;} });

    if(actualiza){

      this.usuarioService.modificaPerfil(usuario).pipe(first()).subscribe((res: any) => {

        if(!res.error){

          this.errores.length = 0;

          Swal.fire('Genial!', 'Su perfil se ha actualizado correctamente!', 'success');

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
