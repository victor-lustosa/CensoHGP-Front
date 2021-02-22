import { Precaucao } from './../model/precaucao';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

@Component({
  selector: 'app-descricao-precaucao',
  templateUrl: './descricao-precaucao.component.html',
  styleUrls: ['./descricao-precaucao.component.scss']
})
export class DescricaoPrecaucaoComponent implements OnInit {

  @Input() tituloModal: string;
  @Input() precaucao: Precaucao;
  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

}
