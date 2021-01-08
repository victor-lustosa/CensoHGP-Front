import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroUsuariosRoutingModule } from './cadastro-usuarios-routing.module';
import { CadastroUsuariosComponent } from './cadastro-usuarios.component';


@NgModule({
  declarations: [CadastroUsuariosComponent],
  imports: [
    CommonModule,
    CadastroUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CadastroUsuariosModule { }
