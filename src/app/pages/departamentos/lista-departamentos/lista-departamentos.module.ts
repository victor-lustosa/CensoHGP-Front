import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { ListaDepartamentosRoutingModule } from './lista-departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CadastroDepartamentosComponent } from '../cadastro-departamentos/cadastro-departamentos.component';
import { DepartamentosFilterPipe } from './departamentosfilter.pipe';

@NgModule({
  declarations: [ListaDepartamentosComponent, CadastroDepartamentosComponent, DepartamentosFilterPipe],
  imports: [
    CommonModule,
    NgbPaginationModule,
    ListaDepartamentosRoutingModule,
    SharedModule
  ]
})
export class ListaDepartamentosModule { }
