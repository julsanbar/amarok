import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol/rol.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private rolService: RolService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var result: boolean = true;

      this.rolService.getRol().pipe(first()).subscribe((res: any) => {

        const rol = res.rol;
      
        if(rol !== 'administrador' || rol !== 'empleado'){

          this.router.navigate(['/','home']);

          result = false;

        }

      });

    return result;

  }
  
}
