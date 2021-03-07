import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaDepartamentosRoutingModule } from './lista-departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import {} from '@ng-bootstrap/ng-bootstrap';
import { DescricaoDepartamentoComponent } from '../descricao-departamento/descricao-departamento.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepartamentosFilterPipe } from './departamentos-filter.pipe';
@NgModule({
  declarations: [ListaDepartamentosComponent, CadastroDepartamentoComponent, DescricaoDepartamentoComponent, DepartamentosFilterPipe],
  imports: [
    CommonModule,
    NgbPaginationModule,
    ListaDepartamentosRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgxPaginationModule
  ]
})
export class ListaDepartamentosModule {
}
