import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProcedimentosComponent } from './lista-procedimentos.component';


const routes: Routes = [
  {
    path: '', component: ListaProcedimentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaProcedimentosRoutingModule { }
