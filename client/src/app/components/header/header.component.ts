import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { RolService } from "../../services/rol/rol.service";
import { first } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario/usuario.service';
//import swal from'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(private usuarioService: UsuarioService ,private rolService: RolService ,private sessionService: SesionService ,private router: Router) { }
  
  usuarioNoLogeado: boolean = this.sessionService.noLogeado();
  rolUsuario!: String;
  tituloAlerta!: string; 

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

    if(!this.sessionService.noLogeado()){

      this.rolService.getRol().pipe(first()).subscribe((res: any) => {

        this.rolUsuario = res.rol;
        
      });;

    }

  }

  cerrarSesion(): void{

    this.sessionService.cerrar();
    location.href = "home";

  }

  deshabilitar():void{

    console.log(this.sessionService.getUsuarioLogeado());
    
    this.usuarioService.deshabilitarUsuario(this.sessionService.getUsuarioLogeado()).pipe(first()).subscribe((res: any) => {

      if(res.resul){
        
        this.sessionService.cerrar();
        location.href = "home";

      }

    });;

  }

  redireccionar(evt: any):void{

    if(evt.target.firstChild.nodeValue.includes("Crear")){

      this.router.navigateByUrl('/header', { skipLocationChange: false }).then(() => {
        this.router.navigate(['login']);
      });

    }else{

      this.router.navigateByUrl('/header', { skipLocationChange: false }).then(() => {
        this.router.navigate(['iniciar']);
      });

    }
 
  }

}
