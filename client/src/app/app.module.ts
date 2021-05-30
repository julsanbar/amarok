import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorTailorModule } from "@ngneat/error-tailor";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PedidoService } from "../app/services/pedido/pedido.service";
import { ProductoService } from "../app/services/producto/producto.service";
import { ErrorComponent } from './pages/error/error.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioService } from "../app/services/usuario/usuario.service";
import { SesionService } from "../app/services/sesion/sesion.service";
import { IniciarComponent } from './pages/iniciar/iniciar.component';
import { FormatoFechaPipe } from './pipes/fecha/formato-fecha.pipe';
import { FormatoMonedaPipe } from './pipes/moneda/formato-moneda.pipe';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RolService } from "../app/services/rol/rol.service";
import { ContactoComponent } from './pages/contacto/contacto.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { GestionPedidosComponent } from './pages/gestion-pedidos/gestion-pedidos.component';
import { CarritoComponent } from './modals/carrito/carrito.component';
import { RecaptchaModule } from "ng-recaptcha";
import { IvaPipe } from './pipes/iva/iva.pipe';
import { HabilitadoPipe } from './pipes/habilitado/habilitado.pipe';
import { EditarProveedorComponent } from './modals/editar-proveedor/editar-proveedor.component';
import { NuevoProveedorComponent } from './modals/nuevo-proveedor/nuevo-proveedor.component';
import { EditarUsuarioComponent } from './modals/editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './modals/nuevo-usuario/nuevo-usuario.component';
import { TipoPipe } from './pipes/tipo/tipo.pipe';
import { PedidosUsuarioComponent } from './modals/pedidos-usuario/pedidos-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    ProductosComponent,
    PedidosComponent,
    LoginComponent,
    IniciarComponent,
    FormatoFechaPipe,
    FormatoMonedaPipe,
    PerfilComponent,
    ContactoComponent,
    UsuariosComponent,
    ProveedoresComponent,
    GestionPedidosComponent,
    CarritoComponent,
    IvaPipe,
    HabilitadoPipe,
    EditarProveedorComponent,
    NuevoProveedorComponent,
    EditarUsuarioComponent,
    NuevoUsuarioComponent,
    TipoPipe,
    PedidosUsuarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    NgxPaginationModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          minlength: ({ requiredLength, actualLength }) => 
                      `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })
  ],
  providers: [
    ProductoService,
    PedidoService,
    UsuarioService,
    SesionService,
    RolService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
