import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroDepartamentosComponent } from './cadastro-departamentos.component';


const routes: Routes = [
  {path: '', component: CadastroDepartamentosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroDepartamentosRoutingModule { }
