import { DescricaoProcedimentoComponent } from './../descricao-procedimento/descricao-procedimento.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProcedimentosRoutingModule } from './lista-procedimentos-routing.module';
import { ListaProcedimentosComponent } from './lista-procedimentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { CadastroProcedimentoComponent } from '../cadastro-procedimento/cadastro-procedimento.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProcedimentosFilterPipe } from './procedimentos-filter.pipe';



@NgModule({
  declarations: [ListaProcedimentosComponent, CadastroProcedimentoComponent, DescricaoProcedimentoComponent, ProcedimentosFilterPipe],
  imports: [
    CommonModule,
    ListaProcedimentosRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgbDropdownModule
  ],
  bootstrap:[ListaProcedimentosComponent]
})
export class ListaProcedimentosModule { }
