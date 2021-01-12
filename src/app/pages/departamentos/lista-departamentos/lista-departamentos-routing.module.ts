import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/app/theme/layout/admin/admin.component';
import { ListaDepartamentosComponent } from './lista-departamentos.component';


const routes: Routes = [
  { path : 'departamentos' , component: AdminComponent
 , children: [
  { path: 'lista-departamentos' , component: ListaDepartamentosComponent },
  { path: '', redirectTo : '/departamentos/lista-departamentos', pathMatch: 'full' }

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
