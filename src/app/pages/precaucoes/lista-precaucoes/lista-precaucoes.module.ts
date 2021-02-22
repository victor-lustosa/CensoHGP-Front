import { DescricaoPrecaucaoComponent } from './../descricao-precaucao/descricao-precaucao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPrecaucoesRoutingModule } from './lista-precaucoes-routing.module';
import { ListaPrecaucoesComponent } from './lista-precaucoes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {  NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPrecaucaoComponent } from '../cadastro-precaucao/cadastro-precaucao.component';


@NgModule({
  declarations: [ListaPrecaucoesComponent, CadastroPrecaucaoComponent, DescricaoPrecaucaoComponent],
  imports: [
    CommonModule,
    ListaPrecaucoesRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule
  ]
})
export class ListaPrecaucoesModule { }
