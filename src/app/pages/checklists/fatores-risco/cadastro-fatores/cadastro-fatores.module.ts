import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroFatoresRoutingModule } from './cadastro-fatores-routing.module';
import { CadastroFatoresComponent } from './cadastro-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [CadastroFatoresComponent],
  imports: [
    CommonModule,
    CadastroFatoresRoutingModule,
    SharedModule
  ]
})
export class CadastroFatoresModule { }
