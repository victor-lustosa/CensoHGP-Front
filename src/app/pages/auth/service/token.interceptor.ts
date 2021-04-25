import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

        constructor(public storage: StorageService) {
        }

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            let localUser = this.storage.getLocalUser();

            let N = environment.API.length;
            let requestToAPI = req.url.substring(0, N) == environment.API;

            if (localUser && requestToAPI) {
                const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
                return next.handle(authReq);
            }
            else {
                return next.handle(req);
            }
        }
    }

    export const TokenInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
    };
