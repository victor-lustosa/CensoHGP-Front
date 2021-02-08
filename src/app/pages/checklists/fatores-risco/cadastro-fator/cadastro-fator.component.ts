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

  ngOnInit(): void {
    console.log('id recebido no cadastro modal:' + this.formulario.get('idFatorRisco').value);
    this.tituloModal = "Cadastrar Fator Risco";
    if (this.formulario.valid) {
      this.tituloModal = "Editar Fator Risco";
    }
  }


  saveFatores() {
    // editar um Fator de risco
    if (this.formulario.valid) {
      console.log('save fatores id fator de risco do formulario: ' + this.formulario.value.idFatorRisco + 'id injetado pelo modal: ' + this.formulario.get('idFatorRisco').value)
      if (this.formulario.get('idFatorRisco').value != null) {
        this.fatoresService.update(this.formulario.value)
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
              console.log('Erro ao atualizar fatores de risco, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator de risco.']
            })
      } else {
        //salvar um fator de risco
        if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
          this.erro = true;
          this.mensagemErro = "O nome é obrigatório.";
        } else {
          this.fatoresService.create(this.formulario.value)
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
                console.log('Erro no salvar fatores de risco, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
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
