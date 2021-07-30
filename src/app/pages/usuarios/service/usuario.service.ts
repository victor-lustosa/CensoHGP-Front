import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Usuario } from '../model/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CRUD<Usuario> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/usuario`);
  }

  getStatusUsuarios(){
    return [
      { valor: true, nome: 'Ativo'},
      { valor: false, nome: 'Inativo'}
    ];
  }

  getPorFiltros(perfil: string, status: boolean): Observable<Usuario[]> {
    const httpParams = new HttpParams()
      .set("perfil", perfil)
      .set("status", status ? status.toString() : '');
    const url = `${environment.API}apicensohgp/usuario` + "?" + httpParams.toString();
    return this.http.get<Usuario[]>(url).pipe(retry(1), catchError(this.handleError));
  }

  getTipoUsuarios(): Observable<string[]>  {
    console.log(`${environment.API}apicensohgp/usuario/perfis`)
    return this.http.get<string[]>(`${environment.API}apicensohgp/usuario/perfis`)
    .pipe(retry(1), catchError(this.handleError));
  }

  getUsuarioByMatricula(matricula: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.API}apicensohgp/usuario/matricula/${matricula}`);
  }

  disableUsuario(usuario:Usuario, matricula: string): Observable<any> {
    const httpParams = new HttpParams()
      .set("matricula", matricula)
    const url = `${environment.API}apicensohgp/usuario/mudar-status` + "?" + httpParams.toString();
    return this.http.put<Usuario>(url, usuario).pipe(retry(1), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
      return throwError(error.error.message);
  }
}
