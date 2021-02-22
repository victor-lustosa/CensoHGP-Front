import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrecaucoesRoutingModule } from './precaucoes-routing.module';
import { SharedModule } from './../../theme/shared/shared.module';
import { DescricaoPrecaucaoComponent } from './descricao-precaucao/descricao-precaucao.component';


@NgModule({
  imports: [
    CommonModule,
    PrecaucoesRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class PrecaucoesModule { }
