import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaIncidentesComponent } from './lista-incidentes.component';


const routes: Routes = [
  {
    path: '', component: ListaIncidentesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaIncidentesRoutingModule { }
