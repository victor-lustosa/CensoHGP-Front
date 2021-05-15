import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Precaucao } from '../model/precaucao';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PrecaucaoService extends CRUD<Precaucao> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/precaucao`);
  }
  getStatusPrecaucoes(){
    return [
      { valor: 1, nome: 'Todos' },
      { valor: 2, nome: 'Ativo' },
      { valor: 3, nome: 'Inativo' }
    ];
  }
  getAllAtivos(): Observable<Precaucao[]>  {
    return this.http.get<Precaucao[]>(`${environment.API}apicensohgp/precaucaos/ativos`)
    .pipe(retry(1), catchError(this.handleError));
  }

  getAllInativos(): Observable<Precaucao[]> {
    return this.http.get<Precaucao[]>(`${environment.API}apicensohgp/precaucaos/inativos`)
    .pipe(retry(1), catchError(this.handleError));
  }
 }
