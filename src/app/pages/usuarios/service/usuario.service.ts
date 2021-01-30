import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CRUD } from 'src/app/theme/shared/CRUD';
import { Usuario } from '../model/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CRUD<Usuario> {
  constructor(http: HttpClient){
    super(http, `${environment.API}apicensohgp/usuario`);
  }
 }
