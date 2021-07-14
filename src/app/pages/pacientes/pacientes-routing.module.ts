import { ChecklistResolver } from './guards/checklist.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteService } from './service';


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
      }    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
