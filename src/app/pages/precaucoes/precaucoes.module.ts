import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrecaucoesRoutingModule } from './precaucoes-routing.module';
import { SharedModule } from './../../theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    PrecaucoesRoutingModule,
    SharedModule
  ]
})
export class PrecaucoesModule { }
