import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../model/Paciente';


@Component({
  selector: 'app-descricao-paciente',
  templateUrl: './descricao-paciente.component.html',
  styleUrls: ['./descricao-paciente.component.scss']
})
export class DescricaoPacienteComponent implements OnInit {
  @Input() tituloModal: string;
  @Input() paciente: Paciente;
  today:String;
constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.today = new Date(this.paciente.dataNascimento).toISOString().split('T')[0];
  }

}
