import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  public captcha: boolean = false;

  ngOnInit(): void {

  }

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);

    if(captchaResponse !== null || captchaResponse !== undefined){
      
      this.captcha = true;

    }

  }

  enviar(): void{

    this.usuarioService.enviaEmail('nose@nose.com').pipe(first()).subscribe((res:any) => {


  
    });

  }

}
