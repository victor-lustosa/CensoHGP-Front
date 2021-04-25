import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../const/routes';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    // public routers: typeof routes = routes;
    // constructor(private authService: AuthService, private router: Router){}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // const authenticated =  this.authService.isAuthenticated();
      // console.log('autenticado: ' + authenticated);
      // if(authenticated){
      //     this.router.navigate([this.routers.DASHBOARD]).then();
      //   return true;
      // }else{
      //     this.router.navigate([this.routers.LOGIN]).then();
        return false;
      // }
   }
}
