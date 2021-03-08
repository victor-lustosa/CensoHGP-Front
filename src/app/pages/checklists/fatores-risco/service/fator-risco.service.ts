
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fator } from '../model/fator';

import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'

})
export class FatorRiscoService extends CRUD<Fator>{

  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/fator-risco`);
  }
  getStatusFatores(){
    return [
      { valor: 1, nome: 'Todos' },
      { valor: 2, nome: 'Ativo' },
      { valor: 3, nome: 'Inativo' }
    ];
  }
  getAllAtivos(): Observable<Fator[]>  {
    return this.http.get<Fator[]>(`${environment.API}apicensohgp/fator-riscos/ativos`).pipe(retry(1), catchError(this.handleError));
  }

  getAllInativos(): Observable<Fator[]> {
    return this.http.get<Fator[]>(`${environment.API}apicensohgp/fator-riscos/inativos`).pipe(retry(1), catchError(this.handleError));
  }
}
