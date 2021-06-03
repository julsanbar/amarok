import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, OnChanges {

  constructor(private usuarioService: UsuarioService,private formBuilder: FormBuilder) { }

  public registroFormModal!: FormGroup;
  public errores: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

    this.registroFormModal = this.formBuilder.group({

      usuarioModal: ['',
        [
          Validators.required,
          Validators.pattern(/^([a-zA-Z0-9ñáéíóú]+[\s]*)+$/),
          Validators.minLength(5)
        ]
      ],
      emailModal: ['',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });

  }

  enviar(){

    const usuario = new Usuario();

    usuario.usuario = this.registroFormModal.get('usuarioModal')?.value;
    usuario.email = this.registroFormModal.get('emailModal')?.value;

    this.usuarioService.password(usuario).pipe(first()).subscribe((res: any) => {

      if(!res.error){

        this.errores.length = 0;

        Swal.fire({
          title: 'Correo enviado',
          text: 'Se le ha enviado una nueva contraseña al correo de la cuenta indicada',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }else{

        this.registroFormModal.invalid;
        this.errores = res.error;

      }

    }, (err: any) => {
      
      console.log(err)

    });

  }

}
