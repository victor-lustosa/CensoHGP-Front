import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Precaucao} from './../model/precaucao';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PrecaucaoService {
    private readonly url = `${environment.API}apicensohgp`;

   // injetando o HttpClient
   constructor(private httpClient: HttpClient) { }

   // Headers
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   // Obtem todas as Precaucaos
   getListaPrecaucoes(): Observable<Precaucao[]> {
     return this.httpClient.get<Precaucao[]>(this.url + '/' + 'Precaucoes')
       .pipe(
         retry(2),
         catchError(this.handleError));
   }

   // Obtem uma Precaucao pelo id
   getPrecaucaoById(id: number): Observable<Precaucao> {
     return this.httpClient.get<Precaucao>(this.url + '/' + 'Precaucao' + '/' + id)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // salva uma Precaucao
   savePrecaucao(Precaucao: Precaucao): Observable<Precaucao> {
     return this.httpClient.post<Precaucao>(this.url + '/' + 'Precaucao', Precaucao)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // atualiza uma Precaucao
   updatePrecaucao(Precaucao: Precaucao): Observable<Precaucao> {
      return this.httpClient.put<Precaucao>(this.url + '/' + 'Precaucao', Precaucao, this.httpOptions)
       .pipe(
         retry(1),
         catchError(this.handleError)
       );
   }

   // deleta uma Precaucao
   deletePrecaucao(Precaucao: Precaucao) {
     console.log(this.url + '/' + 'Precaucao' + '/' + Precaucao.idPrecaucao);
     return this.httpClient.delete<Precaucao>(this.url + '/' + 'Precaucao' + '/' + Precaucao.idPrecaucao, this.httpOptions)
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
