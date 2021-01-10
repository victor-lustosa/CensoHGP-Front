import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroUsuariosRoutingModule } from './cadastro-usuarios-routing.module';
import { CadastroUsuariosComponent } from './cadastro-usuarios.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CadastroUsuariosComponent],
  imports: [
    CommonModule,
    CadastroUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbDropdownModule
  ]
})
export class CadastroUsuariosModule { }
