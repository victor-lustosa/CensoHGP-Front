import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder} from '@angular/forms';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cadastro-fatores',
  templateUrl: './cadastro-fatores.component.html',
  styleUrls: ['./cadastro-fatores.component.scss'],

})
export class CadastroFatoresComponent implements OnInit {
  @Input() public formulario: FormGroup;
  @Input() containerClick = false;

  errors: String[];
  sucesso: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,private fatoresService: FatorRiscoService, private formBuilder: FormBuilder
    , location:Location) { }

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
              this.sucesso = true
              console.log(sucess),
              console.log('fator salvo com sucesso'),
              this.formulario.reset(),
              setTimeout(() => {
                location.reload();
              }, 2000);
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
                console.log('fator salvo com sucesso'),
                setTimeout(() => {
                  location.reload();
                }, 2000);

              },
              errorResponse => {
                console.log('Erro no salvar fatores de risco, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }



      }
