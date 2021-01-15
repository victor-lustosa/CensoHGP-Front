import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroIncidentesRoutingModule } from './cadastro-incidentes-routing.module';
import { CadastroIncidentesComponent } from './cadastro-incidentes.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [CadastroIncidentesComponent],
  imports: [
    CommonModule,
    CadastroIncidentesRoutingModule,
    SharedModule
  ]
})
export class CadastroIncidentesModule { }
