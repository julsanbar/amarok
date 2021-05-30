import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private proveedorService:ProveedorService) { }

  public proveedores: Proveedor[] = [];
  public page: number = 1;
  public total: number = 0;
  public perPage: number = 10;
  public proveedor: Proveedor = new Proveedor();

  colorRow !: number;
  filaSeleccionada:any;

  ngOnInit(): void {

    this.filaSeleccionada = function(index: number,item: Proveedor){  
      
      this.colorRow = index; 
      this.proveedor = item;

    } 

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getDatos(this.page);
    });

  }
  
  eliminaSeleccion():void{

    //document.getElementsByTagName("tr")[this.colorRow+1].removeAttribute("class");
    //document.getElementsByTagName("tr")[this.colorRow+1].setAttribute("class","normal");
    //setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['proveedores']);
    //},1000);
    //console.log(document.getElementsByTagName("tr")[this.colorRow])

  }

  getDatos(page: number): void {

    this.proveedorService.getPaginationProveedores(page).pipe(first()).subscribe((res: any) => {

      this.proveedores = res.docs.docs;
      //console.log(this.proveedores)
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
