import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PacientesService } from '../service/pacientes.service';

@Component({
  selector: 'app-cadastro-pacientes',
  templateUrl: './cadastro-pacientes.component.html',
  styleUrls: ['./cadastro-pacientes.component.scss']
})
export class CadastroPacientesComponent implements OnInit {
  @Input() public formulario: FormGroup;

  errors: String[];
  sucesso: boolean = false;
  model: NgbDateStruct;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private pacientesService: PacientesService, location: Location) { }

    ngOnInit(): void {
      console.log('id recebido no cadastro modal:' + this.formulario.get('idPaciente').value);
    }


    savePacientes() {
      // editar um Paciente
      if (this.formulario.valid) {
        console.log('save pacientes id paciente do formulario: ' + this.formulario.value.idPaciente + 'id injetado pelo modal: ' + this.formulario.get('idPaciente').value)
        if (this.formulario.get('idPaciente').value != null) {
          this.pacientesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              console.log(sucess),
              this.sucesso = true,
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000)
            },
            errorResponse => {
              console.log('Erro ao atualizar pacientes, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar paciente.']
            })
          } else {
            //salvar um paciente
            this.pacientesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000)
              },
              errorResponse => {
                console.log('Erro no salvar pacientes, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }
      }
