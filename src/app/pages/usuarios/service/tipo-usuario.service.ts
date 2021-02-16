import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService  {
  getTipoUsuarios() {
    return [
      { valor: true, nome: 'Administrador' },
      { valor: false, nome: 'Enfermeiro' }
    ];
  }
 }
