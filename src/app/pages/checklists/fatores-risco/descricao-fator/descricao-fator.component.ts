import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Fator } from '../model/fator';

@Component({
  selector: 'app-descricao-fator',
  templateUrl: './descricao-fator.component.html',
  styleUrls: ['./descricao-fator.component.scss']
})
export class DescricaoFatorComponent implements OnInit {
  @Input() tituloModal: string;
  @Input() fatorRisco: Fator;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
