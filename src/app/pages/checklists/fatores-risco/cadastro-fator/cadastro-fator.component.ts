import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-fator',
  templateUrl: './cadastro-fator.component.html',
  styleUrls: ['./cadastro-fator.component.scss'],

})
export class CadastroFatorComponent implements OnInit {

  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  erro: boolean = false;
  mensagemErro: string;
  tituloModal: string;


  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private fatoresService: FatorRiscoService, location: Location) { }

  ngOnInit(): void { }
  saveFatores() {
    if (this.formulario.valid) {
      if (this.formulario.get('idFatorRisco').value != null) {
        this.fatoresService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                setTimeout(() => {
                  this.activeModal.close()

                }, 1000)
            })
      } else {
        if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
          this.erro = true;
          this.mensagemErro = "O nome é obrigatório.";
        } else {
          this.fatoresService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.formulario,
                  this.sucesso = true,
                  this.formulario.reset(),
                  setTimeout(() => {
                    this.activeModal.close()
                  }, 1000)
              })
        }
      }
    } else {
      if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
        this.erro = true;
        this.mensagemErro = "O nome é obrigatório.";
      }
    }
  }


}
