import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbPopoverModule, NgbTooltipModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { ListaDepartamentosRoutingModule } from './lista-departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CadastroDepartamentosComponent } from '../cadastro-departamentos/cadastro-departamentos.component';


@NgModule({
  declarations: [ListaDepartamentosComponent, CadastroDepartamentosComponent],
  imports: [
    CommonModule,

    NgbPaginationModule,
    NgbTooltipModule,
    NgbPopoverModule,
    ListaDepartamentosRoutingModule,
    SharedModule
  ],
    bootstrap:[ListaDepartamentosComponent]
})
export class ListaDepartamentosModule { }
