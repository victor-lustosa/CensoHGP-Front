import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaIncidentesRoutingModule } from './lista-incidentes-routing.module';
import { ListaIncidentesComponent } from './lista-incidentes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ListaIncidentesComponent],
  imports: [
    CommonModule,
    ListaIncidentesRoutingModule,
      SharedModule
  ]
})
export class ListaIncidentesModule { }
