import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.css']
})
export class IniciarComponent implements OnInit {

  constructor(private sessionService: SesionService, private formBuilder: FormBuilder, private router: Router, private usuarioService : UsuarioService) { }

  public registroForm!: FormGroup;
  public errores: any[] = [];

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({

      usuario: ['',
        [
          Validators.required,
          Validators.pattern(/^([a-zA-Z0-9ñáéíóú]+[\s]*)+$/),
          Validators.minLength(5)
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

    const usuario = new Usuario();

    usuario.usuario = this.registroForm.get('usuario')?.value;
    usuario.email = this.registroForm.get('email')?.value;
    usuario.password = this.registroForm.get('password')?.value;

    this.usuarioService.iniciarUsuario(usuario).subscribe((res: any) => {

      if(!res.error){

        this.sessionService.iniciar(res.data._id);
        location.href = 'producto';

      }else{

        this.registroForm.invalid;
        this.errores = res.error;

      }

    }, (err: any) => {
      
      console.log(err)

    });

  }

}
