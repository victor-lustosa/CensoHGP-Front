import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Departamento } from '../model/departamento';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends CRUD<Departamento> {
  constructor(  http:HttpClient ){
    super(http, `${environment.API}apicensohgp/departamento`);
  }
}
