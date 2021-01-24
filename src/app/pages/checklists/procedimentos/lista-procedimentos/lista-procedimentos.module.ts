import { ProcedimentosFilterPipe } from './procedimentosfilter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProcedimentosRoutingModule } from './lista-procedimentos-routing.module';
import { ListaProcedimentosComponent } from './lista-procedimentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import { CadastroProcedimentosComponent } from '../cadastro-procedimentos/cadastro-procedimentos.component';



@NgModule({
  declarations: [ListaProcedimentosComponent, CadastroProcedimentosComponent, ProcedimentosFilterPipe],
  imports: [
    CommonModule,
    ListaProcedimentosRoutingModule,
    SharedModule,
    NgbPaginationModule
  ],
  bootstrap:[ListaProcedimentosComponent]
})
export class ListaProcedimentosModule { }
