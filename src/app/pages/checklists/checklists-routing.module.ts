import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cadastro-fatores',
        loadChildren: () => import('./fatores-risco/cadastro-fatores/cadastro-fatores.module').then(module => module.CadastroFatoresModule)
      },{
        path: 'fatores',
        loadChildren: () => import('./fatores-risco/lista-fatores/lista-fatores.module').then(module => module.ListaFatoresModule)
      },
      {
        path: 'cadastro-incidentes',
        loadChildren: () => import('./incidentes/cadastro-incidentes/cadastro-incidentes.module').then(module => module.CadastroIncidentesModule)
      },
      {
        path: 'incidentes',
        loadChildren: () => import('./incidentes/lista-incidentes/lista-incidentes.module').then(module => module.ListaIncidentesModule)
      },
      {
        path: 'cadastro-procedimentos',
        loadChildren: () => import('./procedimentos/cadastro-procedimentos/cadastro-procedimentos.module').then(module => module.CadastroProcedimentosModule)
      },
      {
        path: 'procedimentos',
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
