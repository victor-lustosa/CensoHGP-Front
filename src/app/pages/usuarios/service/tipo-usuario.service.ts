import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService  {
  getTipoUsuarios() {
    return [
      { valor: 1, nome: 'Administrador' },
      { valor: 2, nome: 'Enfermeiro' }
    ];
  }
 }
