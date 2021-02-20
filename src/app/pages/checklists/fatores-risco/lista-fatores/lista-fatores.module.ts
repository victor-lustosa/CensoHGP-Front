import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFatoresRoutingModule } from './lista-fatores-routing.module';
import { ListaFatoresComponent } from './lista-fatores.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { DescricaoFatorComponent } from '../descricao-fator/descricao-fator.component';

@NgModule({
  declarations: [ListaFatoresComponent, CadastroFatorComponent,DescricaoFatorComponent],
  imports: [
    CommonModule,
    ListaFatoresRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbPaginationModule
  ],
  bootstrap:[ListaFatoresComponent]
})
export class ListaFatoresModule { }
