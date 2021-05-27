import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { Usuario } from 'src/app/models/usuario.model';
import { RolService } from 'src/app/services/rol/rol.service';
import { SesionService } from 'src/app/services/sesion/sesion.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  public registroForm!: FormGroup;
  public errores: any[] = [];
  @Input() pedidoEditar!:Pedido;

  public products!: any[];
  public products2!: any[];

  constructor(private rolService: RolService,private router: Router ,private sessionService: SesionService ,private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {


  }

  ngOnInit(): void {  }


}
