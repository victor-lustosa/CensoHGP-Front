import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { routes } from '../../const';
import { Usuario } from '../../usuarios/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(  private router: Router){

  }
    public routers: typeof routes = routes;
  usuarioAutenticado = new EventEmitter<boolean>();
  public login(formulario:FormGroup): void {
    if(formulario.get('email').value == 'franciscovictor@unitins.br'&& formulario.get('senha').value =='123456'){
    this.router.navigate([this.routers.DASHBOARD]).then();
    }else{
      this.router.navigate([this.routers.LOGIN]).then();
    }
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
