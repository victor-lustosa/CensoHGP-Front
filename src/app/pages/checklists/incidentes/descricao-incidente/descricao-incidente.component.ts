import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Incidente } from '../model/incidente';

@Component({
  selector: 'app-descricao-incidente',
  templateUrl: './descricao-incidente.component.html',
  styleUrls: ['./descricao-incidente.component.scss']
})
export class DescricaoIncidenteComponent implements OnInit {
  @Input() tituloModal:string;
  @Input() incidente:Incidente;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
