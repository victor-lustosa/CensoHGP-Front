import { DescricaoIncidenteComponent } from './../descricao-incidente/descricao-incidente.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroIncidenteComponent } from './../cadastro-incidente/cadastro-incidente.component';

import { ListaIncidentesRoutingModule } from './lista-incidentes-routing.module';
import { ListaIncidentesComponent } from './lista-incidentes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ListaIncidentesComponent, CadastroIncidenteComponent, DescricaoIncidenteComponent],
  imports: [
    CommonModule,
    ListaIncidentesRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule
    ],
    bootstrap:[ListaIncidentesComponent]
})
export class ListaIncidentesModule { }
