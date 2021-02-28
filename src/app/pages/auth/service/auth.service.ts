import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { routes } from '../../const';
import { Usuario } from '../../usuarios/model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient, HttpParams } from '@angular/common/http';
import { CRUD } from 'src/app/theme/shared/CRUD';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends CRUD<Usuario>{
  apiURL: string = environment.API + "/api/usuarios"
  tokenURL: string = environment.API + environment.obterTokenUrl
  enfermeiroID: string = environment.enfermeiroId;
  enfermeiroSecret: string = environment.enfermeiroSecret;
  admID: string = environment.admId;
  admSecret: string = environment.admSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(  http:HttpClient ){
    super(http, `${environment.API}apicensohgp/departamento`);
  }
  obterToken(){
      const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }
  encerrarSessao(){
    localStorage.removeItem('access_token')
  }
  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }
    return null;
  }
  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }
  tentarLogar( matricula: string, senha: string ) : Observable<any> {
    const params = new HttpParams().set('matricula', matricula).set('senha', senha).set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.enfermeiroID}:${this.enfermeiroSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post( this.tokenURL, params.toString(), { headers });
  }
}
