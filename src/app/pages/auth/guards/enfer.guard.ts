import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../const/routes';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnferGuard implements CanActivateChild {
  public routers: typeof routes = routes;

  constructor(private authService: AuthService,
    private router: Router) { }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log(routes);
      console.log(state);
      const enferAuthenticated = this.authService.isEnferAuthenticated();
      if(state.url.includes('departamentos') && enferAuthenticated){
        return false;
      }
      if(state.url.includes('precaucoes')){
        return false;
      }
      if(state.url.includes('fator-riscos')){
        return false;
      }
      if(state.url.includes('procedimentos')){
        return false;
      }
      if(state.url.includes('incidentes')){
        return false;
      }
      
            
      return true;
  }
  
}
