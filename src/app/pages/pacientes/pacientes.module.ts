import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { ChecklistPacienteComponent } from './checklist-paciente/checklist-paciente.component';
import { TransferenciaPacienteComponent } from './transferencia-paciente/transferencia-paciente.component';


@NgModule({
  declarations: [ChecklistPacienteComponent, TransferenciaPacienteComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }
