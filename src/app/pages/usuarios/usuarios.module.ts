import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CadastroUsuariosComponent } from './cadastro-usuarios/cadastro-usuarios.component';


@NgModule({
  declarations: [ListaUsuariosComponent, CadastroUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
