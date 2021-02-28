import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(  http:HttpClient ){
    super(http, `${environment.API}apicensohgp/departamento`);
  }
  getTipoDepartamentos(){
     return [

       { valor: true, nome: 'Interno' },
       { valor: false, nome: 'Externo' }
     ];
   }
     getFiltroTipoDepartamentos(){
        return [
          { valor: 1, nome: 'Todos' },
          { valor: 2, nome: 'Interno' },
          { valor: 3, nome: 'Externo' }
        ];
      }
      getStatusDepartamentos(){
        return [
          { valor: 1, nome: 'Todos' },
          { valor: 2, nome: 'Ativo' },
          { valor: 3, nome: 'Inativo' }
        ];
      }

      getByNomeInternos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-internos/${string}`).pipe(retry(1), catchError(this.handleError));
      }
      getByNomeAtivos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-ativos/${string}`).pipe(retry(1), catchError(this.handleError));
      }
      getByNomeAtivosInternos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-ativos-internos/${string}`).pipe(retry(1), catchError(this.handleError));
      }
      getByNomeAtivosExternos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-ativos-externos/${string}`).pipe(retry(1), catchError(this.handleError));
      }
      getByNomeInativos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-inativos/${string}`).pipe(retry(1), catchError(this.handleError));
      }
      getByNomeInativosInternos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-inativos-internos/${string}`).pipe(retry(1), catchError(this.handleError));
      }

      getByNomeInativosExternos(string: any): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/nome-inativos-externos/${string}`).pipe(retry(1), catchError(this.handleError));
      }




      getAllAtivosInternos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos-internos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllAtivosExternos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos-externos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInativosInternos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/inativos-internos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInativosExternos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/inativos-externos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInternos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/internos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllExternos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/externos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllAtivos(): Observable<Departamento[]>  {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInativos(): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/inativos`).pipe(retry(1), catchError(this.handleError));
      }
}
