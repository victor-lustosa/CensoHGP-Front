import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaUsuariosRoutingModule } from './lista-usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuariosFilterPipe } from './usuarios-filter.pipe';


@NgModule({
  declarations: [ListaUsuariosComponent, CadastroUsuarioComponent, UsuariosFilterPipe],
  imports: [
    CommonModule,
    ListaUsuariosRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgbDropdownModule
  ]
})
export class ListaUsuariosModule { }
