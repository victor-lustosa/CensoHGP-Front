import { ChecklistResolver } from './guards/checklist.resolver';
import { TransferenciaResolver } from './guards/transferencia.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gerenciar-pacientes',
        loadChildren: () => import('./lista-pacientes/lista-pacientes.module').then(module => module.ListaPacientesModule)
      },
      {
        path: 'historico-checklist/:id',resolve: {checklists: ChecklistResolver},
        loadChildren: () => import('./historico-checklist/historico-checklist.module').then(module => module.HistoricoChecklistModule)
      },
      {
        path: 'historico-transferencia/:id',resolve: {transferencias: TransferenciaResolver},
        loadChildren: () => import('./historico-transferencia/historico-transferencia.module').then(module => module.HistoricoTransferenciaModule)
      }   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }