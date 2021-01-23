import { Component, OnInit, Input, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup} from '@angular/forms';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-fatores',
  templateUrl: './cadastro-fatores.component.html',
  styleUrls: ['./cadastro-fatores.component.scss'],

})
export class CadastroFatoresComponent implements OnInit {
  @Input() public formulario: FormGroup;
  containerClick = false;
  errors: String[];
  sucesso: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,public modalService: NgbModal, private fatoresService: FatorRiscoService, location:Location) { }

    ngOnInit(): void {
      console.log('id recebido no cadastro modal:' + this.formulario.get('idFatorRisco').value);
    }


    saveFatores() {
      // editar um Fator de risco
      if (this.formulario.valid) {
        console.log('save fatores id fator de risco do formulario: '+this.formulario.value.idFatorRisco +'id injetado pelo modal: '+ this.formulario.get('idFatorRisco').value)
        if ( this.formulario.get('idFatorRisco').value != null) {
          this.fatoresService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              console.log(sucess),
              this.sucesso = true,
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close();
              }, 1000)
            },
            errorResponse => {
              console.log('Erro ao atualizar fatores de risco, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator de risco.']
            })
          } else {
            //salvar um fator de risco
            this.fatoresService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                setTimeout(() => {
                  this.activeModal.close();
                }, 1000)
              },
              errorResponse => {
                console.log('Erro no salvar fatores de risco, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }
      }
