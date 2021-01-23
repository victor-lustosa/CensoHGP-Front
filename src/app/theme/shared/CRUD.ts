import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CrudInterface } from './crud-interface';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CRUD<T> implements CrudInterface<T>{

  constructor(private http: HttpClient,@Inject(String) private API_URL: string){}

  getByNome(object: T): Observable<T[]> {
    const urlApi:string = (this.API_URL + '/nome/')
      console.log('get by nome do crud: '+urlApi + "/"+ object)
    return this.http.get<T[]>( urlApi + object, object).pipe(retry(1), catchError(this.handleError));
  }

  getAll(): Observable<T[]> {
    console.log('get all do crud: '+`${this.API_URL}s`)
    return this.http.get<T[]>(`${this.API_URL}s`).pipe(retry(1), catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
  console.log('get by id do crud: '+`${this.API_URL}/${id}`)
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(retry(1), catchError(this.handleError));
  }

  create(object: T): Observable<T> {
    console.log('create do crud'+`${this.API_URL}`)
    return this.http.post<T>(`${this.API_URL}`, object).pipe(retry(1), catchError(this.handleError));
  }

  update(object: T): Observable<T> {
    console.log('update do crud'+`${this.API_URL}`)
    return this.http.put<T>(`${this.API_URL}`, object).pipe(retry(1), catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    console.log('delete do crud'+`${this.API_URL}`)
    return this.http.delete<T>(`${this.API_URL}/${id}`).pipe(retry(1), catchError(this.handleError));
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
