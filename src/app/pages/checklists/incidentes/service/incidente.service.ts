import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import{Incidente} from '../model/incidente';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService extends CRUD<Incidente> {

  constructor(http: HttpClient) {
    super(http, `${environment.API}apicensohgp/incidente`);
   }
   getStatusIncidentes(){
     return [
       { valor: 1, nome: 'Todos' },
       { valor: 2, nome: 'Ativo' },
       { valor: 3, nome: 'Inativo' }
     ];
   }
   getAllAtivos(): Observable<Incidente[]>  {
     return this.http.get<Incidente[]>(`${environment.API}apicensohgp/incidentes/ativos`).pipe(retry(1), catchError(this.handleError));
   }

   getAllInativos(): Observable<Incidente[]> {
     return this.http.get<Incidente[]>(`${environment.API}apicensohgp/incidentes/inativos`).pipe(retry(1), catchError(this.handleError));
   }
}
