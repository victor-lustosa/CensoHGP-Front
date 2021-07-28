import { Checklist } from './../model/Checklist';
import { Transferencia } from '../model/Transferencia';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Paciente } from '../model/Paciente';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class PacienteService extends CRUD<Paciente> {
  constructor(http: HttpClient) {
    super(http, `${environment.API}apicensohgp/paciente`);
  }

  getAllPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${environment.API}apicensohgp/pacientes`)
      .pipe(retry(1), catchError(this.handleError));
  }
  getPacientesDepartamento(departamento:string): Observable<Paciente[]>  {
    console.log(`${environment.API}apicensohgp/pacientes/departamento/${departamento}`)
    return this.http.get<Paciente[]>(`${environment.API}apicensohgp/pacientes/departamento/${departamento}`)
    .pipe(retry(1), catchError(this.handleError));
  }
  createChecklist(checklist: Checklist): Observable<Checklist> {
    return this.http.post<Checklist>(`${environment.API}apicensohgp/checklist`, checklist)
      .pipe(retry(1), catchError(this.handleError));
  }

  createTransferencia(transferencia: Transferencia): Observable<Transferencia> {
    return this.http.post<Transferencia>(`${environment.API}apicensohgp/transferencia`, transferencia)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllChecklistPaciente(idPaciente: number): Observable<any> {
        return this.http.get<any>(`${environment.API}apicensohgp/checklists/paciente/${idPaciente}`)
      .pipe(retry(1), catchError(this.handleError));
  }
  getAllTransferenciaPaciente(idPaciente: number): Observable<any> {
    return this.http.get<any>(`${environment.API}apicensohgp/transferencias/paciente/${idPaciente}`)
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
      { nome: 'Masculino' },
      {  nome: 'Feminino' }
    ];
  }
}
