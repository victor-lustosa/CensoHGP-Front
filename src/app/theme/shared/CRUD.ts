import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CrudInterface } from './crud-interface';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CRUD<T> implements CrudInterface<T>{
  constructor(protected http: HttpClient, @Inject(String) private API_URL: string) { }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}s`)
    .pipe(retry(1), catchError(this.handleError));
  }

  getByNome(string: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}/nome/${string}`)
    .pipe(retry(1), catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`)
    .pipe(retry(1), catchError(this.handleError));
  }

  create(object: T): Observable<T> {
    return this.http.post<T>(`${this.API_URL}`, object)
    .pipe(retry(1), catchError(this.handleError));
  }

  update(object: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}`, object)
    .pipe(retry(1), catchError(this.handleError));
  }

  disable(object: T): Observable<any> {
    return this.http.put<T>(`${this.API_URL}/mudar-status`, object)
    .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
      return throwError(error.error.message);
  }
}
