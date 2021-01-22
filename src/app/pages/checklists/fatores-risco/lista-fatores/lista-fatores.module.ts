import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaFatoresRoutingModule } from './lista-fatores-routing.module';
import { ListaFatoresComponent } from './lista-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {NgbPopoverModule, NgbTooltipModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './../../../../theme/shared/filter.pipe';




@NgModule({
  declarations: [ListaFatoresComponent,FilterPipe],
  imports: [
    CommonModule,
    ListaFatoresRoutingModule,
    SharedModule,
    NgbPopoverModule,
    NgbTooltipModule,NgbPaginationModule
  ],
  bootstrap:[ListaFatoresComponent]
})
export class ListaFatoresModule { }
