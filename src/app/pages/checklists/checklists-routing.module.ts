import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gerenciar-fatores',
        loadChildren: () => import('./fatores-risco/lista-fatores/lista-fatores.module').then(module => module.ListaFatoresModule)
      },
      {
        path: 'gerenciar-incidentes',
        loadChildren: () => import('./incidentes/lista-incidentes/lista-incidentes.module').then(module => module.ListaIncidentesModule)
      },

      {
        path: 'gerenciar-procedimentos',
        loadChildren: () => import('./procedimentos/lista-procedimentos/lista-procedimentos.module').then(module => module.ListaProcedimentosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
