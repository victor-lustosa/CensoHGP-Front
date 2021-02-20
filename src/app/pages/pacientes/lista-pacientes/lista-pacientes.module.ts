import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacientesRoutingModule } from './lista-pacientes-routing.module';
import { ListaPacientesComponent } from './lista-pacientes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListaPacientesComponent, CadastroPacienteComponent],
  imports: [
    CommonModule,
    ListaPacientesRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap:[CadastroPacienteComponent]
})
export class ListaPacientesModule { }
