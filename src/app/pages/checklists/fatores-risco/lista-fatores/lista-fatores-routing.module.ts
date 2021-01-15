import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaFatoresComponent } from './lista-fatores.component';



const routes: Routes = [
  {
    path: '' , component: ListaFatoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaFatoresRoutingModule { }
