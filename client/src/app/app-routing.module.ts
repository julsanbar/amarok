import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../app/pages/home/home.component";
import { ErrorComponent } from "../app/pages/error/error.component";

const routes: Routes = [
  { 
    path: '', component: HomeComponent 
  },
  { 
    path: 'home', component: HomeComponent 
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
