
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Procedimentos } from '../model/procedimentos';

import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'

})
export class ProcedimentoService extends CRUD<Procedimentos>{

  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/procedimento`);
  }
}
