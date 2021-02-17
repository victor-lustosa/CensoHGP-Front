import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaDepartamentosRoutingModule } from './lista-departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import {} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ListaDepartamentosComponent, CadastroDepartamentoComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    ListaDepartamentosRoutingModule,
    SharedModule
  ]
})
export class ListaDepartamentosModule {
}
