import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPrecaucoesRoutingModule } from './lista-precaucoes-routing.module';
import { ListaPrecaucoesComponent } from './lista-precaucoes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ListaPrecaucoesComponent],
  imports: [
    CommonModule,
    ListaPrecaucoesRoutingModule,
    SharedModule
  ]
})
export class ListaPrecaucoesModule { }
