import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPrecaucoesRoutingModule } from './lista-precaucoes-routing.module';
import { ListaPrecaucoesComponent } from './lista-precaucoes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {  NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPrecaucaoComponent } from '../cadastro-precaucao/cadastro-precaucao.component';


@NgModule({
  declarations: [ListaPrecaucoesComponent, CadastroPrecaucaoComponent],
  imports: [
    CommonModule,
    ListaPrecaucoesRoutingModule,
    SharedModule,
    NgbPaginationModule
  ]
})
export class ListaPrecaucoesModule { }
