import { SharedModule } from './../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrecaucoesRoutingModule } from './precaucoes-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrecaucoesRoutingModule,
    SharedModule
  ]
})
export class PrecaucoesModule { }
