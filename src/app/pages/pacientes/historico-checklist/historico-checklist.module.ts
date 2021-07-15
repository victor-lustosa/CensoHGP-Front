import { DescricaoHistoricoChecklistComponent } from './../descricao-historico-checklist/descricao-historico-checklist.component';
import { HistoricoChecklistComponent } from './historico-checklist.component';
import { HistoricoChecklistFilterPipe } from './historico-checklist-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoChecklistRoutingModule } from './historico-checklist-routing.module';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [HistoricoChecklistComponent,HistoricoChecklistFilterPipe, DescricaoHistoricoChecklistComponent],
  imports: [
    CommonModule,
    HistoricoChecklistRoutingModule,
    SharedModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  bootstrap:[HistoricoChecklistComponent]

})
export class HistoricoChecklistModule { }
