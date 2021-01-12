import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroPacientesComponent } from './cadastro-pacientes.component';


const routes: Routes = [
  {
    path: '', component: CadastroPacientesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroPacientesRoutingModule { }
