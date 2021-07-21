//import { DescricaoHistoricoChecklistComponent } from './../descricao-historico-checklist/descricao-historico-checklist.component';
import { HistoricoTransferenciaComponent } from './historico-transferencia.component';
//import { HistoricoChecklistFilterPipe } from './historico-checklist-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoTransferenciaRoutingModule } from './historico-transferencia-routing.module';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [HistoricoTransferenciaComponent],
  imports: [
    CommonModule,
    HistoricoTransferenciaRoutingModule,
    SharedModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  bootstrap:[HistoricoTransferenciaComponent]

})
export class HistoricoTransferenciaModule { }
