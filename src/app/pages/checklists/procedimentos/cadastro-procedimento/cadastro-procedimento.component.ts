import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ProcedimentoService } from '../service/procedimento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-procedimento',
  templateUrl: './cadastro-procedimento.component.html',
  styleUrls: ['./cadastro-procedimento.component.scss']
})
export class CadastroProcedimentoComponent implements OnInit {
  @Input() public formulario: FormGroup;


  errors: String[];
  sucesso: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,private procedimentosService: ProcedimentoService, private formBuilder: FormBuilder
    , location:Location) { }

    ngOnInit(): void {
      console.log('id recebido no cadastro modal:' + this.formulario.get('idProcedimento').value);
    }

    saveProcedimentos() {
      // editar um Fator
      if (this.formulario.valid) {
        console.log('save procedimentos id fator  do formulario: '+this.formulario.value.idProcedimento +'id injetado pelo modal: '+ this.formulario.get('idProcedimento').value)
        if ( this.formulario.get('idProcedimento').value != null) {
          this.procedimentosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true
              console.log(sucess),
              console.log('fator salvo com sucesso'),
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000);
            },
            errorResponse => {
              console.log('Erro ao atualizar procedimentos , servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator .']
            })
          } else {
            //salvar um fator
            this.procedimentosService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                console.log('fator salvo com sucesso'),
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000);

              },
              errorResponse => {
                console.log('Erro no salvar procedimentos , servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }



      }
