import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { first } from 'rxjs/operators';
import { RolService } from 'src/app/services/rol/rol.service';
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router, private usuarioService:UsuarioService) { }

  public usuarios: Usuario[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 10;
  public usuario: Usuario = new Usuario();
  public pedidos!: Pedido[]|null;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getDatos(this.page);
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

}
