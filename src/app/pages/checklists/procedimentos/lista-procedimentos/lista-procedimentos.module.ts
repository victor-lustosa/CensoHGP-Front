import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProcedimentosRoutingModule } from './lista-procedimentos-routing.module';
import { ListaProcedimentosComponent } from './lista-procedimentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ListaProcedimentosComponent],
  imports: [
    CommonModule,
    ListaProcedimentosRoutingModule,
      SharedModule
  ]
})
export class ListaProcedimentosModule { }
