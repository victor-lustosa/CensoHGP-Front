import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroProcedimentosComponent } from './cadastro-procedimentos.component';


const routes: Routes = [
  {
    path: '', component: CadastroProcedimentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroProcedimentosRoutingModule { }
