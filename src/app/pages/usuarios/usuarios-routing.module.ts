import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gerenciar-usuarios',
        loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then(module => module.ListaUsuariosModule), canActivateChild: [AuthGuard]
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
