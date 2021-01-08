import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuariosComponent } from './cadastro-usuarios.component';


const routes: Routes = [
  {
  path: '',
    component: CadastroUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroUsuariosRoutingModule { }
