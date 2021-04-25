import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http';
import { LocalUser } from '../model/local_user';
import { StorageService } from './storage.service';
import { Credenciais } from '../model/Credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( private storage: StorageService,private http:HttpClient ){
  }
  authenticate(creds : Credenciais ) : Observable<any>{
       return this.http.post(
           `${environment.API}/login`,
           creds,
           {
               observe: 'response',
               responseType: 'text'
           });
   }

   isAuthenticated() : boolean {
   const token = this.storage.getLocalUser().token;
   console.log('token: ' + token)
   if(token){
     const expired = this.jwtHelper.isTokenExpired(token)
     return !expired;
   }
   return false;
 }
    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            matricula: this.jwtHelper.decodeToken(tok).sub
        };
        console.log('jwt chegando em matricula: ', this.jwtHelper.decodeToken(tok).sub);
        this.storage.setLocalUser(user);
    }
  tentarLogar( creds : Credenciais ) {
    return this.http.post(`${environment.API}login`, creds,
      {
        observe: 'response',
        responseType: 'text'
      });
    }
  }
