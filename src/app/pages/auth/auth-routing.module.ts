import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [      {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
    },
    {
      path: 'recuperar-senha',
      loadChildren: () => import('./recuperar-senha/recuperar-senha.module').then(module => module.RecuperarSenhaModule)
    }

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
