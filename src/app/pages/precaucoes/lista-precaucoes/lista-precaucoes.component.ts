import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-lista-precaucoes',
  templateUrl: './lista-precaucoes.component.html',
  styleUrls: ['./lista-precaucoes.component.scss']
})
export class ListaPrecaucoesComponent implements OnInit {
  formulario: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  pesquisar() {}
}
