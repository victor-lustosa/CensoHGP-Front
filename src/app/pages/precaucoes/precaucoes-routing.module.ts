import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gerenciar-precaucoes',
        loadChildren: () => import('./lista-precaucoes/lista-precaucoes.module').then(module => module.ListaPrecaucoesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrecaucoesRoutingModule { }
