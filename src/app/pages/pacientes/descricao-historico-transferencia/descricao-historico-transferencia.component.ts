import { ChecklistDTO } from './../model/Checklist.dto';
import { TransferenciaDTO } from '../model/Transferencia.dto';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-descricao-historico-transferencia',
  templateUrl: './descricao-historico-transferencia.component.html',
  styleUrls: ['./descricao-historico-transferencia.component.scss']
})
export class DescricaoHistoricoTransferenciaComponent implements OnInit {

  @Input() tituloModal: string;
  @Input() transferencia: TransferenciaDTO;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
