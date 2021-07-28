import { ChecklistPacienteComponent } from './../checklist-paciente/checklist-paciente.component';
import { TransferenciaPacienteComponent } from '../transferencia-paciente/transferencia-paciente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacientesRoutingModule } from './lista-pacientes-routing.module';
import { ListaPacientesComponent } from './lista-pacientes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesFilterPipe } from './pacientes-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DescricaoPacienteComponent } from '../descricao-paciente/descricao-paciente.component';
import { NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [ChecklistPacienteComponent, TransferenciaPacienteComponent, DescricaoPacienteComponent,ListaPacientesComponent,
     CadastroPacienteComponent, PacientesFilterPipe],
  imports: [
    CommonModule,
    ListaPacientesRoutingModule,
    SharedModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxMaskModule.forChild()
  ],
  bootstrap:[CadastroPacienteComponent, TransferenciaPacienteComponent, ChecklistPacienteComponent]
})
export class ListaPacientesModule { }
