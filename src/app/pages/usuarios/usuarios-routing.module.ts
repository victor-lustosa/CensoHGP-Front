import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gerenciar-usuarios',
        loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then(module => module.ListaUsuariosModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(module => module.PerfilUsuarioModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
