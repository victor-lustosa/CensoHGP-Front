import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPrecaucoesRoutingModule } from './lista-precaucoes-routing.module';
import { ListaPrecaucoesComponent } from './lista-precaucoes.component';


@NgModule({
  declarations: [ListaPrecaucoesComponent],
  imports: [
    CommonModule,
    ListaPrecaucoesRoutingModule
  ]
})
export class ListaPrecaucoesModule { }
