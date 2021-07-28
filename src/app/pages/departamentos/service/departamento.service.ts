import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Departamento } from '../model/departamento';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends CRUD<Departamento> {

  constructor(  http: HttpClient ){
    super(http, `${environment.API}apicensohgp/departamento`);
  }
  getTipoDepartamentos(){
     return [

       { valor:'true', nome: 'Interno' },
       { valor:'false', nome: 'Externo' }
     ];
   }

  getStatusDepartamentos(){
    return [
      { valor: 'true', nome: 'Ativo' },
      { valor: 'false', nome: 'Inativo' }
    ];
  }

  getPorFiltros(tipo: string, status: string): Observable<Departamento[]> {
    const httpParams = new HttpParams()
      .set("tipo", tipo)
      .set("status", status);
    const url = `${environment.API}apicensohgp/departamento` + "?" + httpParams.toString();
    return this.http.get<Departamento[]>(url).pipe(retry(1), catchError(this.handleError));
  }


      getAllAtivos(): Observable<Departamento[]>  {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos`)
        .pipe(retry(1), catchError(this.handleError));
      }


}
