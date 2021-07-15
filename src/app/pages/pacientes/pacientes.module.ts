import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { ChecklistResolver } from './guards/checklist.resolver';
import { PacienteService } from './service/paciente.service';
import { DescricaoHistoricoChecklistComponent } from './descricao-historico-checklist/descricao-historico-checklist.component';



@NgModule({
  declarations: [DescricaoHistoricoChecklistComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
  ],providers: [ChecklistResolver,PacienteService]
})
export class PacientesModule { }
