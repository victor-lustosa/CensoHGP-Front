import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './pages/auth/guards/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(module => module.AuthModule)}
  ]
}
, { path: '',  component: AdminComponent, children: [
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(module => module.DashboardModule)},
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(module => module.UsuariosModule)},
  { path: 'precaucoes', loadChildren: () => import('./pages/precaucoes/precaucoes.module').then(module => module.PrecaucoesModule)},
  { path: 'departamentos', loadChildren: () => import('./pages/departamentos/departamentos.module').then(module => module.DepartamentosModule)},
  { path: 'pacientes', loadChildren: () => import('./pages/pacientes/pacientes.module').then(module => module.PacientesModule)},
  { path: 'checklists', loadChildren: () => import('./pages/checklists/checklists.module').then(module => module.ChecklistsModule)}
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  useHash: true,
    preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
