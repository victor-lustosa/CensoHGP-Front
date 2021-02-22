import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RecuperarSenhaComponent } from './recuperar-senha.component';
import { RecuperarSenhaRoutingModule } from './recuperar-senha-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RecuperarSenhaRoutingModule
  ],
  declarations: [RecuperarSenhaComponent]
})
export class RecuperarSenhaModule { }
