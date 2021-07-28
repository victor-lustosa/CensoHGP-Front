import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { ChecklistResolver } from './guards/checklist.resolver';
import { TransferenciaResolver } from './guards/transferencia.resolver';
import { PacienteService } from './service/paciente.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PacientesRoutingModule,
  ],providers: [ChecklistResolver, TransferenciaResolver, PacienteService]
})
export class PacientesModule { }
