import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, delay, tap } from 'rxjs/operators';

export class CrudService <T>{

  constructor(protected http:HttpClient, private API_URL: string){}
  getBusca(nome: string, registro: T) {
      return this.http.get<T>(this.API_URL + '/' + registro + '/'+'nome' + '/' + nome)
  }

  // Obtem todos os elementos
  listar() {
    return this.http.get<T>(this.API_URL)
    .pipe(
      delay(10000),
      tap(console.log)
    );
  }
  // Obtem pelo id
  getById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  //salvar um elemento
  save(registro: T){
    if(registro['id']){
      return this.update(registro);
    }
    return this.create(registro);
  }
  //criar um elemento
  create(registro: T){
    return this.http.post<T>(this.API_URL, registro)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
//atualizar um elemento
  update(registro: T) {
    return this.http.put<T>(`${this.API_URL}/${registro['id']}`, registro)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  // deletar um elemento
  deleteFatores(id: number) {
    console.log(this.API_URL);
    return this.http.delete<T>(`${this.API_URL}/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //tratamento de excessoes
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
