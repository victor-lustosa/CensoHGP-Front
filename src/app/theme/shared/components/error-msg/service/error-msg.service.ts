import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { environment } from 'src/environments/environment';
import { Mensagem } from '../model/mensagem';
@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService extends CRUD<Mensagem> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/mensagem`);
  }
 }
