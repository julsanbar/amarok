import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion/sesion.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(private sessionService: SesionService ,private router: Router) { }
  
  usuarioNoLogeado: boolean = this.sessionService.noLogeado();

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }

  redireccionar():void{

    this.router.navigateByUrl('/header', { skipLocationChange: false }).then(() => {
      this.router.navigate(['login']);
    }); 

  }

}
