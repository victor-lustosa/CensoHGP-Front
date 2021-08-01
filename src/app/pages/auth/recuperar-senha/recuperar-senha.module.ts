import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RecuperarSenhaComponent } from './recuperar-senha.component';
import { RecuperarSenhaRoutingModule } from './recuperar-senha-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RecuperarSenhaRoutingModule,
      SharedModule
  ],
  declarations: [RecuperarSenhaComponent]
})
export class RecuperarSenhaModule { }
