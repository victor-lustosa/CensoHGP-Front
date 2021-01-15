import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroIncidentesComponent } from './cadastro-incidentes.component';


const routes: Routes = [
  {path: '', component: CadastroIncidentesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroIncidentesRoutingModule { }
