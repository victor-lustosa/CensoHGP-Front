
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Procedimento } from '../model/procedimento';

import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'

})
export class ProcedimentoService extends CRUD<Procedimento>{

  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/procedimento`);
  }
  getStatusProcedimentos(){
    return [
      { valor: 1, nome: 'Todos' },
      { valor: 2, nome: 'Ativo' },
      { valor: 3, nome: 'Inativo' }
    ];
  }
  getAllAtivos(): Observable<Procedimento[]>  {
    return this.http.get<Procedimento[]>(`${environment.API}apicensohgp/procedimentos/ativos`)
    .pipe(retry(1), catchError(this.handleError));
  }

  getAllInativos(): Observable<Procedimento[]> {
    return this.http.get<Procedimento[]>(`${environment.API}apicensohgp/procedimentos/inativos`)
    .pipe(retry(1), catchError(this.handleError));
  }
}
