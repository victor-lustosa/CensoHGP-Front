import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { LocalUser } from '../model/local_user';
import { StorageService } from './storage.service';
import { Credenciais } from '../model/Credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private storage: StorageService, private http: HttpClient) {
  }
  
  logout() {
    this.storage.setLocalUser(null);
  }
  isAuthenticated(): boolean {
    const token = this.storage.getLocalUser().token;
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }
  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(19);
    let perfil = authorizationValue.substring(0, 12);
    let user: LocalUser = {
      token: tok,
      matricula: this.jwtHelper.decodeToken(tok).sub,
      perfil: perfil
    };
    this.storage.setLocalUser(user);
  }
  tentarLogar(creds: Credenciais) {
    return this.http.post(`${environment.API}login`, creds,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
