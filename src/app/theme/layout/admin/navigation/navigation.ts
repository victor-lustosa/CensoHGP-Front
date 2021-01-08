import { Injectable } from '@angular/core';

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
    title: 'Navigação',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Inicio',
        type: 'item',
        url: '/dashboard/analytics',
        icon: 'feather icon-home',
        breadcrumbs: false
      },
      {
        id: 'usuario',
        title: 'Usuarios',
        type: 'item',
        url: '/usuario/lista-usuario',
        icon: 'feather icon-users',
        breadcrumbs: false
      },
      {
        id: 'paciente',
        title: 'Pacientes',
        type: 'item',
        url: '/paciente/lista-paciente',
        icon: 'feather icon-user',
        breadcrumbs: false
      },
      {
        id: 'departamento',
        title: 'Departamentos',
        type: 'item',
        url: '/departamento/lista-departamento',
        icon: 'feather icon-map',
        breadcrumbs: false
      },
      {
        id: 'precaucoes',
        title: 'Precauções',
        type: 'collapse',
        icon: 'feather icon-flag',
        children: [
          {
            id: 'incidente',
            title: 'Incidentes',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'procedimentos',
            title: 'Procedimentos',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'fator-risco',
            title: 'Fatores de Risco',
            type: 'item',
            url: '/auth/dfd',
            target: true,
            breadcrumbs: false
          }
        ]
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
