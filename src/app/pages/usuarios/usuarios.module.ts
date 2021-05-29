import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class UsuariosModule { }
