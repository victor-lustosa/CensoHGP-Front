import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaUsuariosRoutingModule } from './lista-usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { CadastroUsuariosComponent } from '../cadastro-usuarios/cadastro-usuarios.component';


@NgModule({
  declarations: [ListaUsuariosComponent, CadastroUsuariosComponent],
  imports: [
    CommonModule,
    ListaUsuariosRoutingModule,
    SharedModule,
    NgbPaginationModule
  ]
})
export class ListaUsuariosModule { }
