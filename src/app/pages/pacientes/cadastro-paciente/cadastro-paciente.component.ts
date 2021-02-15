import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private pacientesService: PacienteService) { }

    ngOnInit(): void {}
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    savePacientes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idPaciente').value != null) {
          this.pacientesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroPacienteComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500)
            })
          } else {
            this.pacientesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroPacienteComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500)
              }
            )
          }
        }
      }
    }
