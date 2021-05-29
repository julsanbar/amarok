import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol/rol.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {

  constructor(private rolService: RolService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const rol: string|null = this.rolService.devuelveRolSesion();

    if((rol === null) || (rol !== 'registrado') || (rol === undefined)){

      this.router.navigate(['/','home']);

      return false;
    }

    return true;

  }
  
}
