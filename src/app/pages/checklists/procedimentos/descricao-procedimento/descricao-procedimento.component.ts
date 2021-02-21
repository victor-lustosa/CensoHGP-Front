import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Procedimento } from '../model/procedimento';

@Component({
  selector: 'app-descricao-procedimento',
  templateUrl: './descricao-procedimento.component.html',
  styleUrls: ['./descricao-procedimento.component.scss']
})
export class DescricaoProcedimentoComponent implements OnInit {

  @Input() tituloModal: string;
  @Input() procedimento: Procedimento;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
