import { PacienteService } from './../service/paciente.service';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError} from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class ChecklistResolver implements Resolve<any> {
  constructor(private pacienteService: PacienteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.pacienteService.getAllChecklistPaciente(route.params['id']).pipe(
      catchError(() => {
       return EMPTY;
     }));
  }
}
