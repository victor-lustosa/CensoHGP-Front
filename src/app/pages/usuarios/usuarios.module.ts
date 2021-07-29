import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { PerfilEnfermeiroComponent } from './perfil-enfermeiro/perfil-enfermeiro.component';


@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class UsuariosModule { }
