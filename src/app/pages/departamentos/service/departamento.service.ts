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
      getAllAtivosInternos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos-internos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllAtivosExternos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos-externos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInativosInternos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/inativos-internos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInativosExternos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/inativos-externos`).pipe(retry(1), catchError(this.handleError));
      }

      getAllInternos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/internos`).pipe(retry(1), catchError(this.handleError));
      }
      getAllExternos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/externos`).pipe(retry(1), catchError(this.handleError));
      }
      getAllAtivos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos`).pipe(retry(1), catchError(this.handleError));
      }
      getAllInativos(): Observable<Departamento[]> {
        console.log('get all Ativos internos: ' )
        return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/inativos`).pipe(retry(1), catchError(this.handleError));
      }
}
