import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecaucaoService } from '../service/precaucao.service';
import { Location } from '@angular/common';
import { toTypeScript } from '@angular/compiler';
@Component({
  selector: 'app-cadastro-precaucao',
  templateUrl: './cadastro-precaucao.component.html',
  styleUrls: ['./cadastro-precaucao.component.scss']
})
export class CadastroPrecaucaoComponent implements OnInit {

  @Input() public formulario: FormGroup;
  @Input() tituloModal: string;

  errors: String[];
  sucesso: boolean = false;
  erro: boolean = false;
  mensagemErro: string;

  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private precaucoesService: PrecaucaoService, location: Location) { }

    ngOnInit(): void {}
    savePrecaucoes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idPrecaucao').value != null) {
          this.precaucoesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.sucesso = true,
              this.formulario.reset(),

              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 500)
            })
          } else {
            if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
              this.erro = true;
              this.mensagemErro = "O nome é obrigatório.";
            } else {
              if(this.formulario.value.ativo != true){
              this.formulario.value.ativo = true;  
              }
              this.precaucoesService.create(this.formulario.value)
              .subscribe(
                sucess => {
                  this.sucesso = true,
                  this.erro = false;
                  this.formulario.reset(),

                  setTimeout(() => {
                    this.activeModal.close(),
                    location.reload();
                  }, 500)
                }
              )
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
