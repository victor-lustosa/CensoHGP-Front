import { Departamento } from './../model/departamento';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

@Component({
  selector: 'app-descricao-departamento',
  templateUrl: './descricao-departamento.component.html',
  styleUrls: ['./descricao-departamento.component.scss']
})
export class DescricaoDepartamentoComponent implements OnInit {

  @Input() tituloModal: string;
  @Input() departamento: Departamento;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
