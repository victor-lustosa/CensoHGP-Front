import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacientesRoutingModule } from './lista-pacientes-routing.module';
import { ListaPacientesComponent } from './lista-pacientes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';


@NgModule({
  declarations: [ListaPacientesComponent, CadastroPacienteComponent],
  imports: [
    CommonModule,
    ListaPacientesRoutingModule,
    SharedModule,
    NgbPaginationModule,

  ]
})
export class ListaPacientesModule { }
