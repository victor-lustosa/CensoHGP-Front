import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaUsuariosRoutingModule } from './lista-usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ListaUsuariosComponent],
  imports: [
    CommonModule,
    ListaUsuariosRoutingModule,
    SharedModule
  ]
})
export class ListaUsuariosModule { }
