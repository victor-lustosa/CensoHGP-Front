import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lista-usuarios',
        loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then(module => module.ListaUsuariosModule)
      },
      {
        path: 'cadastro-usuarios',
        loadChildren: () => import('./cadastro-usuarios/cadastro-usuarios.module').then(module => module.CadastroUsuariosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
