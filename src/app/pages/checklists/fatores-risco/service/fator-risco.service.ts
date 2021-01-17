import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fatores } from '../model/fatores';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FatorRiscoService {
  private readonly url = `${environment.API}apicensohgp`;

   // injetando o HttpClient
   constructor(private http: HttpClient) { }

   getBusca(nome: string): Observable<Fatores[]> {
     return this.http.get<any>(this.url + '/'+ 'fator-risco' + '/' + 'nome' + '/' + nome)
   }
   // Headers
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   // Obtem todas as Fatoress
   getListaFatores(): Observable<Fatores[]> {
     return this.http.get<Fatores[]>(this.url + '/' + 'fatores-risco')
     .pipe(
       retry(2),
       catchError(this.handleError)
     );
   }

   // Obtem uma Fatores pelo id
   getFatoresById(id: number): Observable<Fatores> {
     return this.http.get<Fatores>(this.url + '/' + 'fator-risco' + '/' + id)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // salva uma Fatores
   createFatores(fatores: Fatores): Observable<Fatores> {
     return this.http.post<Fatores>(this.url + '/' + 'fator-risco', fatores)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // atualiza uma Fatores
   updateFatores(fatores: Fatores): Observable<Fatores> {
      return this.http.put<Fatores>(this.url + '/' + 'fator-risco', fatores, this.httpOptions)
       .pipe(
         retry(1),
         catchError(this.handleError)
       );
   }

   // deleta uma Fatores
   deleteFatores(fatores: Fatores) {
     console.log(this.url + '/' + 'fator-risco' + '/' + fatores.idFatorRisco);
     return this.http.delete<Fatores>(this.url + '/' + 'fator-risco' + '/' + fatores.idFatorRisco, this.httpOptions)
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
