import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FatorRiscoService } from '../service/fator-risco.service';

@Component({
  selector: 'app-cadastro-fator',
  templateUrl: './cadastro-fator.component.html',
  styleUrls: ['./cadastro-fator.component.scss'],

})
export class CadastroFatorComponent implements OnInit {

  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
   at:boolean = true;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private fatoresService: FatorRiscoService) { }

    ngOnInit(): void { }
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    saveFatores() {
      if (this.formulario.valid) {
        if (this.formulario.get('idFatorRisco').value != null) {
          this.fatoresService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroFatorComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500)
            })}else{
              this.fatoresService.create(this.formulario.value)
              .subscribe(
                sucess => {
                  this.sucesso = true,
                  this.formulario.reset(),
                  CadastroFatorComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close()
                  }, 500)
                })
              }
            }
          }
        }
