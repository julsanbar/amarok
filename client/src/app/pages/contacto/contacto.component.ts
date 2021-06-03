import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,private formBuilder: FormBuilder,private router: Router) { }

  public captcha: boolean = false;
  public registroForm!: FormGroup;


  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({
      email: ['',
      [
        Validators.required
      ]
    ]
    });

  }

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);

    if(captchaResponse !== null || captchaResponse !== undefined){
      
      this.captcha = true;

    }

  }

  enviar(): void{

    //console.log(this.captcha)
    //console.log(this.registroForm.get('email')?.value)

    if(this.captcha){

      if(this.registroForm.get('email')?.value){

        const regex = this.registroForm.get('email')?.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
        
        //console.log(regex);

        if(regex !== null){
        
          this.usuarioService.enviaEmail(this.registroForm.get('email')?.value).pipe(first()).subscribe((res:any) => {

            this.captcha = false;
            this.registroForm.reset();

            Swal.fire({
              title: 'Enviado',
              text: 'Nos pondremos en contacto con usted lo antes posible.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Cerrar'
            });

            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['contacto']);
        
          });
        
        }else{

          Swal.fire({
            title: 'Vaya...',
            text: 'El email introducido no es correcto',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Cerrar'
          });

        }

      }else{

        Swal.fire({
          title: 'Vaya...',
          text: 'Debe introducir un email',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }

    }else{

      Swal.fire({
        title: 'Vaya...',
        text: 'Debe resolver el captcha',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Cerrar'
      });

    }

  }

}
