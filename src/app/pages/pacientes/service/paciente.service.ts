import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Paciente } from '../model/Paciente';
import { CRUD } from 'src/app/theme/shared/CRUD';
@Injectable({
  providedIn: 'root'
})
export class PacienteService extends CRUD<Paciente> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/paciente`);
  }
 }
