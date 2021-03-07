import { DescricaoIncidenteComponent } from './../descricao-incidente/descricao-incidente.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroIncidenteComponent } from './../cadastro-incidente/cadastro-incidente.component';

import { ListaIncidentesRoutingModule } from './lista-incidentes-routing.module';
import { ListaIncidentesComponent } from './lista-incidentes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { IncidentesFilterPipe } from './incidentes-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ListaIncidentesComponent, CadastroIncidenteComponent, DescricaoIncidenteComponent,IncidentesFilterPipe],
  imports: [
    CommonModule,
    ListaIncidentesRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgbDropdownModule
    ],
    bootstrap:[ListaIncidentesComponent]
})
export class ListaIncidentesModule { }
