import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './pages/auth/guards/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [ {

      path: 'auth',
      loadChildren: () => import('./pages/auth/auth.module').then(module => module.AuthModule)
    }
  ]
},
{
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [

    {
      path: 'dashboard',
      pathMatch: 'full',

      loadChildren: () => import('./pages/dashboard/dashboard.module').then(module => module.DashboardModule),canLoad: [AuthGuard]
    },
    {
      path: 'usuarios',
      pathMatch: 'full',

      loadChildren: () => import('./pages/usuarios/usuarios.module').then(module => module.UsuariosModule),canLoad: [AuthGuard]
    },
    {
      path: 'precaucoes',
      pathMatch: 'full',

      loadChildren: () => import('./pages/precaucoes/precaucoes.module').then(module => module.PrecaucoesModule),canLoad: [AuthGuard]
    },
    {
      path: 'departamentos',pathMatch: 'full',

      loadChildren: () => import('./pages/departamentos/departamentos.module').then(module => module.DepartamentosModule),canLoad: [AuthGuard]
    },
    {
      path: 'pacientes',pathMatch: 'full',

      loadChildren: () => import('./pages/pacientes/pacientes.module').then(module => module.PacientesModule),canLoad: [AuthGuard]
    },
    {
      path: 'checklists',pathMatch: 'full',

      loadChildren: () => import('./pages/checklists/checklists.module').then(module => module.ChecklistsModule),canLoad: [AuthGuard]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  useHash: true,
    preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
