import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFatoresRoutingModule } from './lista-fatores-routing.module';
import { ListaFatoresComponent } from './lista-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';

@NgModule({
  declarations: [ListaFatoresComponent, CadastroFatorComponent],
  imports: [
    CommonModule,
    ListaFatoresRoutingModule,
    SharedModule,
    NgbPaginationModule
  ],
  bootstrap:[ListaFatoresComponent]
})
export class ListaFatoresModule { }
