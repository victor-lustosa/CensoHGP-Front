import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroPrecaucoesRoutingModule } from './cadastro-precaucoes-routing.module';
import { CadastroPrecaucoesComponent } from './cadastro-precaucoes.component';
import { SharedModule } from '../../../theme/shared/shared.module';

@NgModule({
  declarations: [CadastroPrecaucoesComponent],
  imports: [
    CommonModule,
    CadastroPrecaucoesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CadastroPrecaucoesModule { }
