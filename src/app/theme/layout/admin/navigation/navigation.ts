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
        url: '/usuarios/lista-usuarios',
        icon: 'feather icon-users',
        breadcrumbs: false
      },
      {
        id: 'paciente',
        title: 'Pacientes',
        type: 'item',
        url: '/pacientes/lista-pacientes',
        icon: 'feather icon-user',
        breadcrumbs: false
      },
      {
        id: 'departamento',
        title: 'Departamentos',
        type: 'item',
        url: '/departamento/lista-departamento',
        icon: 'feather icon-navigation',
        breadcrumbs: false
      },
      {
        id: 'precaucoes',
        title: 'Precauções',
        type: 'item',
        url: '/precaucao/lista-precaucao',
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
            id: 'incidente',
            title: 'Incidentes',
            type: 'item',
            url: '/checklists/incidente',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'procedimentos',
            title: 'Procedimentos',
            type: 'item',
            url: '/checklists/procedimentos',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'fator-risco',
            title: 'Fatores de Risco',
            type: 'item',
            url: '/checklists/fator-risco',
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
