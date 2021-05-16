import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../models/usuario.model"
import { UsuarioService } from "../../services/usuario/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }

  public registroForm!: FormGroup;

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({

      nombre: ['',
      [
        Validators.required,
        Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)
      ]
    ],
      licencia: ['null',
      [
        Validators.required
      ]
    ],
      usuario: ['',
      [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9ñáéíóú]+[\s]*)+$/)
      ]
    ],
      codigoPostal: ['',
      [
        Validators.required,
        Validators.pattern(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/)
      ]
    ],
      direccion: ['',
      [
        Validators.required,
        //No debe de contener carácteres especiales
        Validators.pattern(/^[^$%#&|*+@<>.#]*$/)
      ]
    ],
      dni: ['',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{8,8}[A-Za-z]$/)
      ]
    ],
      apellidos: ['',
      [
        Validators.required,
        Validators.pattern(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/)
      ]
    ],
      telefono: ['',
      [
        Validators.required,
        Validators.pattern(/^[9|6|7|8]{1}([\d]{2}[-]*){3}[\d]{2}$/)
      ]
    ],
      nacimiento: ['',
      [
        Validators.required
      ]
    ],
      email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
      password: ['',
      [
        Validators.required,
        //[8,15] longitud, no espacios, 1 mayus, 1 minus, 1 especial, 1 num
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%"*?&])([A-Za-z\d$@"$!%*?&]|[^ ]){8,15}$/)
      ]
    ]
    });

  }

  enviar(){

    //Por defecto el usuario estará habilitado y tendrá el rol de registrado puesto que
    //para escalar en los roles solo lo podrá hacer el administrador.
    const usuario = new Usuario();

    usuario.nombre = this.registroForm.get('nombre')?.value,
    usuario.licencia = this.registroForm.get('licencia')?.value,
    usuario.usuario = this.registroForm.get('usuario')?.value,
    usuario.codigoPostal = this.registroForm.get('codigoPostal')?.value,
    usuario.direccion = this.registroForm.get('direccion')?.value,
    usuario.dni = this.registroForm.get('dni')?.value,
    usuario.apellidos = this.registroForm.get('apellidos')?.value,
    usuario.telefono = this.registroForm.get('telefono')?.value,
    usuario.nacimiento = this.registroForm.get('nacimiento')?.value,
    usuario.email = this.registroForm.get('email')?.value,
    usuario.password = this.registroForm.get('password')?.value,
    usuario.habilitado = true,
    usuario.tipo = 'registrado'

    this.usuarioService.crearUsuario(usuario).subscribe((res: any) => {

      console.log(res);

    }, (err: any) => {
      
      console.log(err)

    });


  }

}
