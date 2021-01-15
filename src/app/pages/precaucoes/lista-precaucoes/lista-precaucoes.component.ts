import { catchError } from 'rxjs/operators';
import { empty, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Precaucao} from './../model/precaucao';
import {PrecaucaoService} from './../service/precaucao.service';
@Component({
  selector: 'app-lista-precaucoes',
  templateUrl: './lista-precaucoes.component.html',
  styleUrls: ['./lista-precaucoes.component.scss']
})
export class ListaPrecaucoesComponent implements OnInit {
  formulario: FormGroup;
  public listaPrecaucoes$: Observable<Precaucao[]>;
  public msgError: string;
  constructor(private precaucaoService: PrecaucaoService) { }

  ngOnInit(): void {
  }
  // Chama o serviço para obtém todas as Precaucaos
  private getListaPrecaucoes() {
    this.listaPrecaucoes$ = this.precaucaoService.getListaPrecaucoes()
      .pipe(
        catchError(error => {
          this.msgError = error;
          console.log("getListaPrecaucaos ListaPrecaucaoComponent : " + error);
          // tslint:disable-next-line: deprecation
          return empty();
        })
      );
  }

  // deleta uma Precaucao
  public desativarPrecaucao(Precaucao: Precaucao) {
    this.precaucaoService.deletePrecaucao(Precaucao).subscribe(
      (sucesso) => {
        console.log(sucesso);
        this.getListaPrecaucoes();
      },
      error => {
        this.msgError = error;
        console.log("error deletePrecaucao ListaPrecaucaoComponent : " + error);
      });
  }

  public editPrecaucao(precaucao: Precaucao): void {


}

  pesquisar() {}
}
