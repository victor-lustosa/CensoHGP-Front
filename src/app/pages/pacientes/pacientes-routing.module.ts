import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pacientes',
        loadChildren: () => import('./lista-pacientes/lista-pacientes.module').then(module => module.ListaPacientesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
