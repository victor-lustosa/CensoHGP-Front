import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';

@Injectable({
  providedIn: 'root'
})
export class FatoresResolverGuard implements Resolve<Fatores> {
  constructor(private service: FatorRiscoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Fatores> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({
      idFatorRisco: null,
      nome: null,
      descricao: null
    });
  }

}
