import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';
import { TipoDepartamento } from '../model/tipoDepartamento';

@Injectable({
  providedIn: 'root'
})
export class TipoDepartamentoService extends CRUD<TipoDepartamento> {
    constructor(  http:HttpClient ){
      super(http, `${environment.API}apicensohgp/tipo-departamento`)
    };
    getAtivos(){
      return [
        { valor: true, nome: 'Ativo' },
        { valor: false, nome: 'Inativo' }
      ];
    }
  }
