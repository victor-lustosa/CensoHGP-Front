import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricosRoutingModule } from './historicos-routing.module';
import { HistoricoChecklistComponent } from './checklists/historico-checklist/historico-checklist.component';
import { ListaChecklistsComponent } from './checklists/lista-checklists/lista-checklists.component';
import { HistoricoTransferenciaComponent } from './transferencias/historico-transferencia/historico-transferencia.component';


@NgModule({
  declarations: [HistoricoChecklistComponent, ListaChecklistsComponent, HistoricoTransferenciaComponent],
  imports: [
    CommonModule,
    HistoricosRoutingModule
  ]
})
export class HistoricosModule { }
