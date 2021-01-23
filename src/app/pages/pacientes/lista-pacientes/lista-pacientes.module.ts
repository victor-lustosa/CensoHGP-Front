import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacientesRoutingModule } from './lista-pacientes-routing.module';
import { ListaPacientesComponent } from './lista-pacientes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPacientesComponent } from '../cadastro-pacientes/cadastro-pacientes.component';


@NgModule({
  declarations: [ListaPacientesComponent, CadastroPacientesComponent],
  imports: [
    CommonModule,
    ListaPacientesRoutingModule,
    SharedModule,
    NgbPaginationModule
  ]
})
export class ListaPacientesModule { }
