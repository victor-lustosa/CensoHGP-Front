import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fatores } from '../model/fatores';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/theme/shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class FatorRiscoService extends CrudService<Fatores> {

   constructor(protected http: HttpClient) {
     super(http, `${environment.API}apicensohgp`)
    }

    getById(id: number) {
      return null;
    }

  }
