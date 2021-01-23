import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecaucaoService } from '../service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cadastro-precaucoes',
  templateUrl: './cadastro-precaucoes.component.html',
  styleUrls: ['./cadastro-precaucoes.component.scss']
})
export class CadastroPrecaucoesComponent implements OnInit {

  @Input() public formulario: FormGroup;

  errors: String[];
  sucesso: boolean = false;

  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private precaucoesService: PrecaucaoService, location: Location) { }

  ngOnInit(): void {
    console.log('id recebido no cadastro modal:' + this.formulario.get('idPrecaucao').value);
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
        this.precaucoesService.create(this.formulario.value)
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
              console.log('Erro no salvar precaucoes, servico ' + errorResponse)
              this.errors = errorResponse.error.errors;
            })
      }
    }
  }
  }
