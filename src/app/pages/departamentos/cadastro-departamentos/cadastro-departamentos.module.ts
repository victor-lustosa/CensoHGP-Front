import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroDepartamentosRoutingModule } from './cadastro-departamentos-routing.module';
import { CadastroDepartamentosComponent } from './cadastro-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CadastroDepartamentosComponent],
  imports: [
    CommonModule,
    CadastroDepartamentosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CadastroDepartamentosModule { }
