import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CRUD<Usuario> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/usuario`);
  }
  getTipoUsuarios(){
    return [
      { valor: 1, nome: 'Todos' },
      { valor: 2, nome: 'Enfermeiro' },
      { valor: 3, nome: 'Administrador' }
    ];
  }
  getStatusUsuarios(){
    return [
      { valor: 1, nome: 'Todos' },
      { valor: 2, nome: 'Ativo' },
      { valor: 3, nome: 'Inativo' }
    ];
  }

  getAllEnfermeirosAtivos(): Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/enfermeiros-ativos`).pipe(retry(1), catchError(this.handleError));
  }

  getAllEnfermeirosInativos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/enfermeiros-inativos`).pipe(retry(1), catchError(this.handleError));
  }

  getAllAdministradoresAtivos(): Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/administradores-ativos`).pipe(retry(1), catchError(this.handleError));
  }

  getAllAdministradoresInativos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/administradores-inativos`).pipe(retry(1), catchError(this.handleError));
  }

  getAllEnfermeiros(): Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/enfermeiros`).pipe(retry(1), catchError(this.handleError));
  }

  getAllAdministradores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/administradores`).pipe(retry(1), catchError(this.handleError));
  }

  getAllAtivos(): Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/ativos`).pipe(retry(1), catchError(this.handleError));
  }

  getAllInativos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API}apicensohgp/usuarios/inativos`).pipe(retry(1), catchError(this.handleError));
  }


 }
