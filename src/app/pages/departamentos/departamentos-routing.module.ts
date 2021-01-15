import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'departamentos',
        loadChildren: () => import('./lista-departamentos/lista-departamentos.module').then(module => module.ListaDepartamentosModule)
      },
      {
        path: 'cadastro-departamentos',
        loadChildren: () => import('./cadastro-departamentos/cadastro-departamentos.module').then(module => module.CadastroDepartamentosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
