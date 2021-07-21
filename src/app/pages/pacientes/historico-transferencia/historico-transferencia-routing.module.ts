import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoTransferenciaComponent } from './historico-transferencia.component';

const routes: Routes = [{
  path: '', component: HistoricoTransferenciaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoTransferenciaRoutingModule { }
