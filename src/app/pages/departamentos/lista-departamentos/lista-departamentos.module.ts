import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { ListaDepartamentosRoutingModule } from './lista-departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import { DepartamentosFilterPipe } from './departamentosfilter.pipe';

@NgModule({
  declarations: [ListaDepartamentosComponent, CadastroDepartamentoComponent, DepartamentosFilterPipe],
  imports: [
    CommonModule,
    NgbPaginationModule,
    ListaDepartamentosRoutingModule,
    SharedModule
  ]
})
export class ListaDepartamentosModule { }
