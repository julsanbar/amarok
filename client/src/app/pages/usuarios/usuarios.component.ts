import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private usuarioService:UsuarioService) { }

  public usuarios: Usuario[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 10;
  public usuario: Usuario = new Usuario();

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getDatos(this.page);
    });

  }
  
  getDatos(page: number): void {

    this.usuarioService.paginationUsuariosAdmin(page).pipe(first()).subscribe((res: any) => {

      this.usuarios = res.docs.docs;
      console.log(this.usuarios)
      this.total = res.docs.totalDocs;

    });

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
