import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FatorRiscoService } from '../service/fator-risco.service';

@Component({
  selector: 'app-cadastro-fatores',
  templateUrl: './cadastro-fatores.component.html',
  styleUrls: ['./cadastro-fatores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastroFatoresComponent implements OnInit {
  @Input() public formulario: FormGroup;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  errors: String[];
  sucesso: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,private fatoresService: FatorRiscoService, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('id recebido no cadastro modal:' + this.formulario.get('idFatorRisco').value);
  }
  ppassBack() {
    if(this.formulario.value != null){
      this.formulario = this.formBuilder.group({
        idFatorRisco: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null]
      })
    }
    this.activeModal.close();
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
            this.formulario.reset();
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
              this.formulario.reset();
            },
            errorResponse => {
              console.log('Erro no salvar fatores de risco, servico ' + errorResponse)
              this.errors = errorResponse.error.errors;
            })
          }
        }
      }
    }
