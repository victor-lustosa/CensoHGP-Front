import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroPrecaucoesComponent } from './cadastro-precaucoes.component';


const routes: Routes = [
  {
    path: '', component: CadastroPrecaucoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroPrecaucoesRoutingModule { }
