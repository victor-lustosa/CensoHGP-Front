import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import{Incidente} from '../model/incidente';
import { CRUD } from 'src/app/theme/shared/CRUD';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService extends CRUD<Incidente> {

  constructor(http: HttpClient) {
    super(http, `${environment.API}apicensohgp/incidente`);
   }
}
