import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencia-paciente',
  templateUrl: './transferencia-paciente.component.html',
  styleUrls: ['./transferencia-paciente.component.scss']
})
export class TransferenciaPacienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Chegou no transferencia de paciente")
  }

}
