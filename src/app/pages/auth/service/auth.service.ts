import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../usuarios/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public login(): void {
    localStorage.setItem('token', 'token');
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<Usuario> {
    return of({
      idUsuario: 5,
      nome:'Victor',
      email: 'franciscovictor@unitins.br',
      matricula:'123213213',
      senha: '123456',
      ativo:true,
      admin:true
    });
  }
}
