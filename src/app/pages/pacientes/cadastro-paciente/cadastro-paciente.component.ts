import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {
  @Input() public formulario: FormGroup;

  errors: String[];
  sucesso: boolean = false;
  model: NgbDateStruct;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private pacientesService: PacienteService, location: Location) { }

    ngOnInit(): void {}
    savePacientes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idPaciente').value != null) {
          this.pacientesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000)
            })
          } else {
            this.pacientesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000)
              }
            )
          }
        }
      }
    }
