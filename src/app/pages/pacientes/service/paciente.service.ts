import { Checklist } from './../model/Checklist';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Paciente } from '../model/Paciente';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Observable } from 'rxjs';
import { PacienteDTO } from '../model/Paciente.dto';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PacienteService extends CRUD<Paciente> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/paciente`);
  }
  getAllPacientes(): Observable<PacienteDTO[]> {
    return this.http.get<PacienteDTO[]>(`${environment.API}apicensohgp/pacientes`)
    .pipe(retry(1), catchError(this.handleError));
  }

  createChecklist(checklist: Checklist): Observable<Checklist> {
    return this.http.post<Checklist>(`${environment.API}apicensohgp/checklist`, checklist)
    .pipe(retry(1), catchError(this.handleError));
  }

  getSexos(){
    return [
      { valor: 1, nome: 'Masculino' },
      { valor: 2, nome: 'Feminino' }
    ];
  }
 }
