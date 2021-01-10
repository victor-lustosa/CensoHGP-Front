import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-precaucoes',
  templateUrl: './cadastro-precaucoes.component.html',
  styleUrls: ['./cadastro-precaucoes.component.scss']
})
export class CadastroPrecaucoesComponent implements OnInit {

  public formulario: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  public savePrecaucao() { }
}
