
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fatores } from '../model/fatores';

import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'

})
export class FatorRiscoService extends CRUD<Fatores>{

  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/fator-risco`);
  }
}
