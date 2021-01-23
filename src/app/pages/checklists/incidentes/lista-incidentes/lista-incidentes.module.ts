
import { IncidentesFilterPipe } from './incidentesfilter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroIncidentesComponent } from './../cadastro-incidentes/cadastro-incidentes.component';

import { ListaIncidentesRoutingModule } from './lista-incidentes-routing.module';
import { ListaIncidentesComponent } from './lista-incidentes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {NgbPopoverModule, NgbTooltipModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ListaIncidentesComponent, CadastroIncidentesComponent, IncidentesFilterPipe],
  imports: [
    CommonModule,
    ListaIncidentesRoutingModule,
      SharedModule,
      NgbPopoverModule,
      NgbTooltipModule,NgbPaginationModule
    ],
    bootstrap:[ListaIncidentesComponent]
})
export class ListaIncidentesModule { }
