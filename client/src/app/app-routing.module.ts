import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../app/pages/home/home.component";
import { ErrorComponent } from "../app/pages/error/error.component";
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginComponent } from './pages/login/login.component';
import { IniciarComponent } from './pages/iniciar/iniciar.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { ContactoComponent } from './pages/contacto/contacto.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SesionGuard } from './guards/sesion/sesion.guard';
import { RolGuard } from './guards/rol/rol.guard';
import { LoginGuard } from './guards/login/login.guard';
import { GestionPedidosComponent } from "../app/pages/gestion-pedidos/gestion-pedidos.component";
import { ClienteGuard } from './guards/cliente/cliente.guard';

const routes: Routes = [
  { 
    path: '', component: HomeComponent 
  },
  { 
    path: 'home', component: HomeComponent 
  },
  {

    path: 'contacto', component: ContactoComponent

  },
  {

    path: 'gestionPedidos', component: GestionPedidosComponent, canActivate: [SesionGuard, RolGuard]

  },
  {

    path: 'proveedores', component: ProveedoresComponent, canActivate: [SesionGuard, RolGuard]

  },
  {
    
    path: 'usuarios', component: UsuariosComponent, canActivate: [SesionGuard, RolGuard]

  },
  {
    path: 'producto', component: ProductosComponent, canActivate: [SesionGuard]
  },
  {

    path: 'pedido', component: PedidosComponent, canActivate: [SesionGuard,ClienteGuard]

  },
  {
    path: 'login', component: LoginComponent, canActivate: [LoginGuard]
  },
  {

    path: 'iniciar', component: IniciarComponent, canActivate: [LoginGuard]

  },
  {

    path: 'perfil', component: PerfilComponent, canActivate: [SesionGuard]

  },
  {

    path: '**', component: ErrorComponent
  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
