import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacientesRoutingModule } from './lista-pacientes-routing.module';
import { ListaPacientesComponent } from './lista-pacientes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListaPacientesComponent, CadastroPacienteComponent],
  imports: [
    CommonModule,
    ListaPacientesRoutingModule,
    SharedModule,
    NgbModule.forRoot() ,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap:[CadastroPacienteComponent]
})
export class ListaPacientesModule { }
