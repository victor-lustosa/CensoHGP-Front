import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFatoresRoutingModule } from './lista-fatores-routing.module';
import { ListaFatoresComponent } from './lista-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { DescricaoFatorComponent } from '../descricao-fator/descricao-fator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FatoresFilterPipe } from './fatores-filter.pipe';

@NgModule({
  declarations: [ListaFatoresComponent, CadastroFatorComponent,DescricaoFatorComponent,FatoresFilterPipe],
  imports: [
    CommonModule,
    ListaFatoresRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgxPaginationModule
  ],
  bootstrap:[ListaFatoresComponent]
})
export class ListaFatoresModule { }
