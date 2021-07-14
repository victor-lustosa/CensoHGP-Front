import { PacienteService } from './../service/paciente.service';
import { ChecklistDTO } from './../model/Checklist.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChecklistResolver implements Resolve<any> {
  constructor(private pacienteService: PacienteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('chegiou aqui mermao' + route.params['id']);
    return this.pacienteService.getAllChecklistPaciente(route.params['id']);



  }
}
