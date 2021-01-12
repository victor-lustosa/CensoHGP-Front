import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/app/theme/layout/admin/admin.component';


const routes: Routes = [
//   { path : '' , component: AdminComponent
//  , children: [
//   { path: 'departamentos',
//    loadChildren: () => import('./lista-departamentos/lista-departamentos.module').then(module => module.ListaDepartamentosModule)

// ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
