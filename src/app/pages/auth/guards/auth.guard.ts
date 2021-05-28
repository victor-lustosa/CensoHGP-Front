import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../const/routes';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  public routers: typeof routes = routes;

  constructor(private authService: AuthService,
    private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      return true;
    } else {
      this.router.navigate([this.routers.LOGIN]).then();
      return false;
    }
  }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      const enferAuthenticated = this.authService.isEnferAuthenticated();
      if(state.url.includes('departamentos') && enferAuthenticated || state.url.includes('precaucoes') ||
      state.url.includes('fator-riscos') || state.url.includes('procedimentos') ||
       state.url.includes('incidentes') ||  state.url.includes('usuarios')){
        return false;
      }
      return true;
  }

}
