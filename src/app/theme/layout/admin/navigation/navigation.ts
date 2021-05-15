import { Credenciais } from './../../../../pages/auth/model/Credenciais';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { routes } from 'src/app/pages/const';
import { UsuarioService } from 'src/app/pages/usuarios/service/usuario.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/pages/auth/service/storage.service';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Inicio',
        type: 'item',
        url: '/dashboard/inicio',
        icon: 'feather icon-home',
        breadcrumbs: false
      },
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        url: '/usuarios/gerenciar-usuarios',
        icon: 'feather icon-users',
        breadcrumbs: false
      },
      {
        id: 'pacientes',
        title: 'Pacientes',
        type: 'item',
        url: '/pacientes/gerenciar-pacientes',
        icon: 'feather icon-user',
        breadcrumbs: false
      },
      {
        id: 'departamentos',
        title: 'Departamentos',
        type: 'item',
        url: '/departamentos/gerenciar-departamentos',
        icon: 'feather icon-navigation',
        breadcrumbs: false
      },
      {
        id: 'precaucoes',
        title: 'Precauções',
        type: 'item',
        url: '/precaucoes/gerenciar-precaucoes',
        icon: 'feather icon-flag',
        breadcrumbs: false
      },
      {
        id: 'checklists',
        title: 'Checklists',
        type: 'collapse',
        icon: 'feather icon-check-square',
        children: [
          {
            id: 'incidentes',
            title: 'Incidentes',
            type: 'item',
            url: '/checklists/gerenciar-incidentes',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'procedimentos',
            title: 'Procedimentos',
            type: 'item',
            url: '/checklists/gerenciar-procedimentos',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'fatores-risco',
            title: 'Fatores de Risco',
            type: 'item',
            url: '/checklists/gerenciar-fatores',
            target: false,
            breadcrumbs: false
          }
        ]
      },
    ]
  }
];
const NavigationItems1 = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Inicio',
        type: 'item',
        url: '/dashboard/inicio',
        icon: 'feather icon-home',
        breadcrumbs: false
      },

      {
        id: 'pacientes',
        title: 'Pacientes',
        type: 'item',
        url: '/pacientes/gerenciar-pacientes',
        icon: 'feather icon-user',
        breadcrumbs: false
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  constructor( private storage: StorageService) { }
  perfilDef: string;
  verificaPerfil(){
  this.perfilDef = this.storage.getLocalUser().perfil;
  }
  get() {
    this.verificaPerfil();
    if (this.perfilDef != null) {
    if (this.perfilDef == '[ROLE_ADMIN]') {
        return NavigationItems;
      } else if (this.perfilDef == '[ROLE_ENFER]') {
        return NavigationItems1;
      }
    } else{
      this.verificaPerfil();
    }
  }
}
