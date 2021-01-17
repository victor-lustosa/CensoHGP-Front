import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroFatoresComponent } from './cadastro-fatores.component';



const routes: Routes = [
  { path: '', component: CadastroFatoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroFatoresRoutingModule { }
