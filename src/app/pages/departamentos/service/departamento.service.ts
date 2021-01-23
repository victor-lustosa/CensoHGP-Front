import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Departamentos } from '../model/departamentos';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends CRUD<Departamentos> {
  constructor(  http:HttpClient ){
    super(http, `${environment.API}apicensohgp/departamento`)
  };
}
