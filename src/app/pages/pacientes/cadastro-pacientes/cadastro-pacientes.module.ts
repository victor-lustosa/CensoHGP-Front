import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroPacientesRoutingModule } from './cadastro-pacientes-routing.module';
import { CadastroPacientesComponent } from './cadastro-pacientes.component';


@NgModule({
  declarations: [CadastroPacientesComponent],
  imports: [
    CommonModule,
    CadastroPacientesRoutingModule
  ]
})
export class CadastroPacientesModule { }
