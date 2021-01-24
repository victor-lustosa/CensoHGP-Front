import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Pacientes } from '../model';
import { CRUD } from 'src/app/theme/shared/CRUD';
@Injectable({
  providedIn: 'root'
})
export class PacientesService extends CRUD<Pacientes> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/paciente`);
  }
 }
