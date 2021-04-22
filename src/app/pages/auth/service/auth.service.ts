import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { routes } from '../../const';
import { Usuario } from '../../usuarios/model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( private http:HttpClient ){
  }
  // obterToken(){
  //     const tokenString = localStorage.getItem('access_token')
  //   if(tokenString){
  //     const token = JSON.parse(tokenString).access_token
  //     return token;
  //   }
  //   return null;
  // }
  // encerrarSessao(){
  //   localStorage.removeItem('access_token')
  // }
  // getUsuarioAutenticado(){
  //   const token = this.obterToken();
  //   if(token){
  //     const usuario = this.jwtHelper.decodeToken(token).user_name
  //     return usuario;
  //   }
  //   return null;
  // }
  // isAuthenticated() : boolean {
  //   const token = this.obterToken();
  //   if(token){
  //     const expired = this.jwtHelper.isTokenExpired(token)
  //     return !expired;
  //   }
  //   return false;
  // }
  //
  //   successfulLogin(authorizationValue : string) {
  //       let tok = authorizationValue.substring(7);
  //       let user : LocalUser = {
  //           token: tok,
  //           email: this.jwtHelper.decodeToken(tok).sub
  //       };
  //       this.storage.setLocalUser(user);
  //
  //   }
  tentarLogar( creds : Object ) : Observable<any> {
    return this.http.post(`${environment.API}login`, creds,
      {
        observe: 'response',
        responseType: 'text'
      });
    }

  }
