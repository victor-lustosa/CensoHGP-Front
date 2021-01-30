
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFatoresRoutingModule } from './lista-fatores-routing.module';
import { ListaFatoresComponent } from './lista-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { NgbdSortableHeader } from '../sortable.directive';



@NgModule({
  declarations: [ListaFatoresComponent,CadastroFatorComponent, NgbdSortableHeader],
  imports: [
    CommonModule,
    ListaFatoresRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbModule
  ],
  bootstrap:[ListaFatoresComponent]
})
export class ListaFatoresModule { }
