import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProcedimentoService } from '../service/procedimento.service';
import { Procedimento } from '../model/procedimento';

@Component({
  selector: 'app-cadastro-procedimento',
  templateUrl: './cadastro-procedimento.component.html',
  styleUrls: ['./cadastro-procedimento.component.scss'],
  providers:[ProcedimentoService]

})
export class CadastroProcedimentoComponent implements OnInit {
   public formulario: FormGroup;
   @Input() public procedimento: Procedimento;
  errors: String[];
  sucesso: boolean = false;
  erroBack: string = '';
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
   at: boolean = true;
  mensagemErro: string = '';
  constructor(
    public activeModal: NgbActiveModal, private procedimentosService: ProcedimentoService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.novoFormulario();
      if (this.procedimento != null) {
        this.updateForm(this.procedimento);
      }

    }
    novoFormulario(){
      this.formulario = this.formBuilder.group({
        idProcedimento: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null],
        ativo: [true]
      });
    }

    updateForm(procedimentos: Procedimento) {
      this.formulario.patchValue({
        idProcedimento: procedimentos.idProcedimento,
        nome: procedimentos.nome,
        descricao: procedimentos.descricao,
        ativo: procedimentos.ativo
      });
    }
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    valid(){
      if (this.formulario.valid){
        this.mensagemErro = '';
        this.saveProcedimentos();
      }
        else{
        this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
      }
    }
    saveProcedimentos() {
      if (this.formulario.valid) {
        if (this.formulario.get('idProcedimento').value != null) {
          this.procedimentosService.update(this.formulario.value)
          .subscribe(
            () => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              CadastroProcedimentoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close();
              }, 500);
            }, (error) => {
              this.erroBack = error;
            }
            );
          } else {
              this.procedimentosService.create(this.formulario.value)
              .subscribe(
                () => {
                  this.formulario,
                  this.sucesso = true,
                  this.formulario.reset(),
                  CadastroProcedimentoComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close();
                  }, 500);
                }, (error) => {
                  this.erroBack = error;
                });
              }
            }
          }
      }
