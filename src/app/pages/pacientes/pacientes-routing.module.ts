import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pacientes',
        loadChildren: () => import('./lista-pacientes/lista-pacientes.module').then(module => module.ListaPacientesModule)
      },
      {
        path: 'cadastro-pacientes',
        loadChildren: () => import('./cadastro-pacientes/cadastro-pacientes.module').then(module => module.CadastroPacientesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
