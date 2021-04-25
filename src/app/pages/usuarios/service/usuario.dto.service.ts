import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario-dto';
@Injectable({
  providedIn: 'root'
})
export class UsuarioDTOService  {
  constructor(private http: HttpClient){
  }


 }
