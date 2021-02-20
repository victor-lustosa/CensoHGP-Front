import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaUsuariosRoutingModule } from './lista-usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';


@NgModule({
  declarations: [ListaUsuariosComponent, CadastroUsuarioComponent],
  imports: [
    CommonModule,
    ListaUsuariosRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule
  ]
})
export class ListaUsuariosModule { }
