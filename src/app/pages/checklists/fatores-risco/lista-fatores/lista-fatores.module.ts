
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFatoresRoutingModule } from './lista-fatores-routing.module';
import { ListaFatoresComponent } from './lista-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule,allIcons } from 'ngx-bootstrap-icons';
import { CadastroFatoresComponent } from '../cadastro-fatores/cadastro-fatores.component';
import { NgbdSortableHeader } from '../sortable.directive';



@NgModule({
  declarations: [ListaFatoresComponent,CadastroFatoresComponent, NgbdSortableHeader],
  imports: [
    CommonModule,
    ListaFatoresRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  bootstrap:[ListaFatoresComponent]
})
export class ListaFatoresModule { }
