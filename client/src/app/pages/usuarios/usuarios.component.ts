import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { first } from 'rxjs/operators';
import { RolService } from 'src/app/services/rol/rol.service';
import { Pedido } from 'src/app/models/pedido.model';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(public sessionService: SesionService, private rolService: RolService, private route: ActivatedRoute, private router: Router, private usuarioService:UsuarioService) { }

  public usuarios: Usuario[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 10;
  public usuario: Usuario = new Usuario();
  public pedidos!: Pedido[]|null;
  public editaUsuario: Usuario = new Usuario();
  public passUsuario: Usuario = new Usuario();

  ngOnInit(): void {

    //console.log(this.sessionService.getUsuarioLogeado())

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getDatos(this.page);
    });

  }
  
  restablece(): void{

    console.log(this.passUsuario)
    const user = new Usuario();

    user.usuario = this.passUsuario.usuario;
    user.email = this.passUsuario.email;

    this.usuarioService.password(user).pipe(first()).subscribe((res: any) => {

      if(!res.error){

        Swal.fire({
          title: 'Correo enviado',
          text: 'Se le ha enviado una nueva contraseña al correo de la cuenta indicada',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }else{

        Swal.fire({
          title: 'Vaya..',
          text: 'No se a podido restablecer la contraseña',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Cerrar'
        });

      }

    }, (err: any) => {
      
      console.log(err)

    });


  }

  cargaPedidos(item: String[]){

    if(item.length > 0){
      this.usuarioService.pedidosUsuario(item).pipe(first()).subscribe((res: any) => {

        //console.log(res.pedidos);
        this.pedidos = res.pedidos;

      });
    }else{

      this.pedidos = null;

    }

  }

  getDatos(page: number): void {

    //console.log(this.rolService.devuelveRolSesion());

    switch (this.rolService.devuelveRolSesion()) {
      case 'administrador':
        
        this.usuarioService.paginationUsuariosAdmin(page).pipe(first()).subscribe((res: any) => {

          this.usuarios = res.docs.docs;
          //console.log(this.usuarios)
          this.total = res.docs.totalDocs;
    
        });

        break;
    
      case 'empleado':
      
        this.usuarioService.paginationUsuariosEmpleado(page).pipe(first()).subscribe((res: any) => {

          this.usuarios = res.docs.docs;
          this.total = res.docs.totalDocs;

        });

        break;
    }

  }

  pageChanged(page: any): void {
    this.page = page;

    const queryParams: Params = { page };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      }
    );

    this.getDatos(this.page);
  }

  trackByItems(index: number, item: any): number { return item.id; }

  refresh():void{

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['usuarios']);

  }

}
