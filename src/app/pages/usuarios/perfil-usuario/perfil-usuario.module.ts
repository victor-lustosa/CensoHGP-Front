import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [PerfilUsuarioComponent],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    SharedModule,
  ],
  bootstrap:[PerfilUsuarioComponent]
})
export class PerfilUsuarioModule { }
