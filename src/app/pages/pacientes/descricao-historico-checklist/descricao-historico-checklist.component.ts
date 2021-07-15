import { ChecklistDTO } from './../model/Checklist.dto';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-descricao-historico-checklist',
  templateUrl: './descricao-historico-checklist.component.html',
  styleUrls: ['./descricao-historico-checklist.component.scss']
})
export class DescricaoHistoricoChecklistComponent implements OnInit {


  @Input() tituloModal: string;
  @Input() checklist: ChecklistDTO;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
