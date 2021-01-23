import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPrecaucoesRoutingModule } from './lista-precaucoes-routing.module';
import { ListaPrecaucoesComponent } from './lista-precaucoes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {  NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPrecaucoesComponent } from '../cadastro-precaucoes/cadastro-precaucoes.component';


@NgModule({
  declarations: [ListaPrecaucoesComponent, CadastroPrecaucoesComponent],
  imports: [
    CommonModule,
    ListaPrecaucoesRoutingModule,
    SharedModule,
    NgbPaginationModule
  ]
})
export class ListaPrecaucoesModule { }
