import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'recuperar-senha',
        loadChildren: () => import('./recuperar-senha/recuperar-senha.module').then(module => module.RecuperarSenhaModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
