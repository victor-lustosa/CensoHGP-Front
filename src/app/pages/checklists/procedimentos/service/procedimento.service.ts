
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Procedimento } from '../model/procedimento';

import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'

})
export class ProcedimentoService extends CRUD<Procedimento>{

  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/procedimento`);
  }
}
