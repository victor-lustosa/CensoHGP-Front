import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDepartamentosRoutingModule } from './lista-departamentos-routing.module';
import { ListaDepartamentosComponent } from './lista-departamentos.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ListaDepartamentosComponent],
  imports: [
    CommonModule,

    ListaDepartamentosRoutingModule,
    SharedModule
  ]
})
export class ListaDepartamentosModule { }
