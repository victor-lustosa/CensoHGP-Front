import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
    getStatus() {
      return [
        { valor: true, desc: 'Ativo' },
        { valor: false, desc: 'Inativo' }
      ];
    }
  getTipoDepartamentos() {
    return [
      { valor: 1 , desc: 'Interno' },
      { valor: 2 , desc: 'Externo' }
    ];
  }
}
