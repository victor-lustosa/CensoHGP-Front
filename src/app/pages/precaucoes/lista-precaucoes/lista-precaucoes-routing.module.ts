import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPrecaucoesComponent } from './lista-precaucoes.component';


const routes: Routes = [
  {
    path: '', component: ListaPrecaucoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPrecaucoesRoutingModule { }
