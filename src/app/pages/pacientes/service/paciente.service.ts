import { Checklist } from './../model/Checklist';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Paciente } from '../model/Paciente';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Observable } from 'rxjs';
import { PacienteDTO } from '../model/Paciente.dto';
import { catchError, retry } from 'rxjs/operators';
import { Departamento } from '../../departamentos/model/departamento';
@Injectable({
  providedIn: 'root'
})

export class PacienteService extends CRUD<Paciente> {
  constructor(http: HttpClient) {
    super(http, `${environment.API}apicensohgp/paciente`);
  }

  getDepartamentos() {
    return [
      { valor: 1, nome: 'Todos' },
      { valor: 2, nome: 'UTI' },
      { valor: 3, nome: 'PEDIATRIA' },
      { valor: 3, nome: 'EMADE' },
      { valor: 3, nome: 'CENTRO' }
    ];
  }

  getAllAtivos(): Observable<Departamento[]>  {
    return this.http.get<Departamento[]>(`${environment.API}apicensohgp/departamentos/ativos`)
    .pipe(retry(1), catchError(this.handleError));
  }
  getAllPacientes(): Observable<PacienteDTO[]> {
    return this.http.get<PacienteDTO[]>(`${environment.API}apicensohgp/pacientes`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createChecklist(checklist: Checklist): Observable<Checklist> {
    return this.http.post<Checklist>(`${environment.API}apicensohgp/checklist`, checklist)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllChecklistPaciente(idPaciente: number): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(`${environment.API}apicensohgp/checklists/paciente/${idPaciente}`)
      .pipe(retry(1), catchError(this.handleError));
  }


  createPaciente(paciente: Paciente, matriculaUsuario: string): Observable<Paciente> {
    const httpParams = new HttpParams()
      .set("matriculaUsuario", matriculaUsuario);
    const url = `${environment.API}apicensohgp/paciente` + "?" + httpParams.toString();
    return this.http.post<Paciente>(url, paciente)
      .pipe(retry(1), catchError(this.handleError));
  }
  updatePaciente(paciente: Paciente, matriculaUsuario: string): Observable<Paciente> {
    const httpParams = new HttpParams()
      .set("matriculaUsuario", matriculaUsuario);
    const url = `${environment.API}apicensohgp/paciente` + "?" + httpParams.toString();
    return this.http.put<Paciente>(url, paciente)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSexos() {
    return [
      { valor: 2, nome: 'Masculino' },
      { valor: 1, nome: 'Feminino' }
    ];
  }
}
