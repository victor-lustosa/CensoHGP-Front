import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'precaucoes',
        loadChildren: () => import('./lista-precaucoes/lista-precaucoes.module').then(module => module.ListaPrecaucoesModule)
      },
      {
        path: 'cadastro-precaucoes',
        loadChildren: () => import('./cadastro-precaucoes/cadastro-precaucoes.module').then(module => module.CadastroPrecaucoesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrecaucoesRoutingModule { }
