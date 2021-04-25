import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/pages/auth/service/storage.service';
import { Usuario } from 'src/app/pages/usuarios/model/usuario';
import { UsuarioService } from 'src/app/pages/usuarios/service/usuario.service';

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
  constructor(){}
  get(perfil?:string) {
    console.log(perfil);
      if(perfil == "Administrador"){

        console.log('perfil: ' + perfil);
        console.log('entrou no 1, ADM ');
        return NavigationItems;
      }else if(perfil == "Enfermeiro"){

        console.log('perfil: ' + perfil);
        console.log('entrou no 2, ENF ');
        return NavigationItems1;
      }
  }
}
