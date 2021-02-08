import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecaucaoService } from '../service/precaucao.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cadastro-precaucao',
  templateUrl: './cadastro-precaucao.component.html',
  styleUrls: ['./cadastro-precaucao.component.scss']
})
export class CadastroPrecaucaoComponent implements OnInit {

  @Input() public formulario: FormGroup;

  errors: String[];
  sucesso: boolean = false;
  erro: boolean = false;
  mensagemErro: string;
  tituloModal: string;

  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private precaucoesService: PrecaucaoService, location: Location) { }

  ngOnInit(): void {
    console.log('id recebido no cadastro modal:' + this.formulario.get('idPrecaucao').value);
    this.tituloModal = "Cadastrar Precaução";
    if (this.formulario.valid) {
      this.tituloModal = "Editar Precaução";
    }
  }

  savePrecaucoes() {
    // editar um Precaucao
    if (this.formulario.valid) {
      console.log('save precaucoes id precaucao do formulario: ' + this.formulario.value.idPrecaucao + 'id injetado pelo modal: ' + this.formulario.get('idPrecaucao').value)
      if (this.formulario.get('idPrecaucao').value != null) {
        this.precaucoesService.update(this.formulario.value)
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
              console.log('Erro ao atualizar precaucoes, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar precaucao.']
            })
      } else {
        //salvar um precaucao

        if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
          this.erro = true;
          this.mensagemErro = "O nome é obrigatório.";
        } else {
          this.precaucoesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                  this.formulario,
                  this.sucesso = true,
                  this.erro = false;
                this.formulario.reset(),
                  setTimeout(() => {
                    this.activeModal.close(),
                      location.reload();
                  }, 1000)
              },
              errorResponse => {
                console.log('Erro no salvar precaucoes, servico ' + errorResponse)
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
