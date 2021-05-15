import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../models/usuario.model"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  public registroForm!: FormGroup;

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({

      nombre: ['',
      [
        Validators.required,
        Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)
      ]
    ],
      licencia: ['',
      [
        Validators.required
      ]
    ],
      usuario: ['',
      [
        Validators.required,
        Validators.pattern(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)
      ]
    ],
      codigoPostal: ['',
      [
        Validators.required,
        Validators.pattern(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/)
      ]
    ],
      //FALTA VALIDACION
      direccion: ['',
      [
        Validators.required/*,
        Validators.pattern(/ /)*/
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

    //ENVIAR A LA BBDD, ASIGNAR A LA SESION Y REDIRECCIONAR
    
    /**
     * , , 
     * , tipo['registrado','administrador','empleado'], 
     * , , 
     * , , , , , 
     * , habilitado
    */
    
    /*this.restService.post('http://localhost:80/backendAngular/registro.php',this.registroForm.value).subscribe((respuesta: any) => {
      
      if(respuesta === true){

        this.sesionService.iniciarSesion(this.registroForm.get('nombre')?.value);
        location.href = "/home";
        //this.router.navigateByUrl("/home");

      }
    

    });*/

  }

}
