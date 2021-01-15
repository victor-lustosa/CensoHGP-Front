import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroProcedimentosRoutingModule } from './cadastro-procedimentos-routing.module';
import { CadastroProcedimentosComponent } from './cadastro-procedimentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [CadastroProcedimentosComponent],
  imports: [
    CommonModule,
    CadastroProcedimentosRoutingModule,
      SharedModule
  ]
})
export class CadastroProcedimentosModule { }
