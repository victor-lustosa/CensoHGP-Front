import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoChecklistComponent } from './historico-checklist.component';

const routes: Routes = [{
  path: '', component: HistoricoChecklistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoChecklistRoutingModule { }
