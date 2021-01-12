import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos/lista-departamentos.component';


@NgModule({
  declarations: [ListaDepartamentosComponent],
  imports: [
    CommonModule,
    DepartamentosRoutingModule
  ]
})
export class DepartamentosModule { }
