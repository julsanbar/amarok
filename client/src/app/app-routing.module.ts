import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../app/pages/home/home.component";
import { ErrorComponent } from "../app/pages/error/error.component";
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginComponent } from './pages/login/login.component';
import { IniciarComponent } from './pages/iniciar/iniciar.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent 
  },
  { 
    path: 'home', component: HomeComponent 
  },
  {
    path: 'producto', component: ProductosComponent
  },
  {

    path: 'pedido', component: PedidosComponent

  },
  {
    path: 'login', component: LoginComponent
  },
  {

    path: 'iniciar', component: IniciarComponent

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
