import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {DepartamentoBusca} from './../model/departamentoBusca'
import {Departamento} from './../model/departamento'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private readonly url = `${environment.API}apicensohgp`;

   // injetando o HttpClient
   constructor(private http: HttpClient) { }

   getBusca(nome: string): Observable<Departamento[]> {
     return this.http.get<any>(this.url + '/'+ 'departamento' + '/' + 'nome' + '/' + nome)
   }
   // Headers
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   // Obtem todas as Departamentos
   getListaDepartamentos(): Observable<Departamento[]> {
     return this.http.get<Departamento[]>(this.url + '/' + 'departamentos')
     .pipe(
       retry(2),
       catchError(this.handleError)
     );
   }

   // Obtem uma Departamento pelo id
   getDepartamentoById(id: number): Observable<Departamento> {
     return this.http.get<Departamento>(this.url + '/' + 'departamento' + '/' + id)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // salva uma Departamento
   saveDepartamento(Departamento: Departamento): Observable<Departamento> {
     return this.http.post<Departamento>(this.url + '/' + 'departamento', Departamento)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // atualiza uma Departamento
   updateDepartamento(Departamento: Departamento): Observable<Departamento> {
      return this.http.put<Departamento>(this.url + '/' + 'departamento', Departamento, this.httpOptions)
       .pipe(
         retry(1),
         catchError(this.handleError)
       );
   }

   // deleta uma Departamento
   deleteDepartamento(Departamento: Departamento) {
     console.log(this.url + '/' + 'departamento' + '/' + Departamento.idDepartamento);
     return this.http.delete<Departamento>(this.url + '/' + 'departamento' + '/' + Departamento.idDepartamento, this.httpOptions)
       .pipe(
         retry(1),
         catchError(this.handleError)
       );
   }

   // Manipulação de erros
   handleError(error: HttpErrorResponse) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Erro ocorreu no lado do client
       errorMessage = error.error.message;
     } else {
       // Erro ocorreu no lado do servidor
       errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
     }
     console.log('HandleError errorMessage: ' + errorMessage);
     return throwError(errorMessage);
   }
 }
