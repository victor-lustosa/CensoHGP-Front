import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoDepartamentoSelecaoService {
  getTipoDepartamentos() {
    return [
      { valor: 1, nome: 'Interno' },
      { valor: 2, nome: 'Externo' }
    ];
  }
  }
