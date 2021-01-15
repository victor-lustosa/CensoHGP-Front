import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDepartamentosComponent } from './lista-departamentos.component';


const routes: Routes = [
  { path: '', component: ListaDepartamentosComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaDepartamentosRoutingModule { }
