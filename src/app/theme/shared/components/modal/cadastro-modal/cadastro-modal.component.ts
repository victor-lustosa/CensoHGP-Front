import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FatorRiscoService } from 'src/app/pages/checklists/fatores-risco/service/fator-risco.service';
import { Fatores } from 'src/app/pages/checklists/fatores-risco/model/fatores';
@Component({
  selector: 'app-cadastro-modal',
  templateUrl: './cadastro-modal.component.html',
  styleUrls: ['./cadastro-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastroModalComponent implements OnInit {
  @Input() public id: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,private fatoresService: FatorRiscoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('id recebido no cadastro modal:' + this.id);
    this.formulario = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
  }

  ppassBack() {
    this.activeModal.close();
  }
  saveFatores() {
    // editar um Fator de risco
    if (this.formulario.valid) {
      console.log('save fatores id fator de risco do formulario: '+this.formulario.value.idFatorRisco +'id injetado pelo modal: '+ this.id)
      if ( this.id != 0) {
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
      updateForm(fatores: Fatores){
        this.formulario.patchValue({
          idFatorRisco: fatores.idFatorRisco,
          nome:fatores.nome,
          descricao: fatores.descricao
        })
      }

      editar(id:number){
        this.fatoresService.getById(id).subscribe((fatores) => {
          this.updateForm(fatores)
        });
      }
    }
