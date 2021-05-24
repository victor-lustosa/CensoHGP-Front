import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Precaucao } from '../model/precaucao';
import { PrecaucaoService } from '../service/precaucao.service';
@Component({
  selector: 'app-cadastro-precaucao',
  templateUrl: './cadastro-precaucao.component.html',
  styleUrls: ['./cadastro-precaucao.component.scss']
})
export class CadastroPrecaucaoComponent implements OnInit {
  @Input() public precaucao: Precaucao;
  formulario: FormGroup;
  @Input() tituloModal: string;
  errors: String[];
  sucesso: boolean = false;
  static atualizando = new EventEmitter<boolean>();
  at: boolean = true;
  mensagemErro: string = '';

  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private precaucoesService: PrecaucaoService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.novoFormulario();
        if (this.precaucao != null) {
        this.updateForm(this.precaucao);
      }
    }
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    novoFormulario(){
      this.formulario = this.formBuilder.group({
        idPrecaucao: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null],
        ativo: [true]
      });
    }
    updateForm(precaucoes: Precaucao){
      this.formulario.patchValue({
        idPrecaucao: precaucoes.idPrecaucao,
        nome:precaucoes.nome,
        descricao: precaucoes.descricao,
        ativo: precaucoes.ativo
      });
    }
    valid(){
      if (this.formulario.valid){
        this.mensagemErro = '';
        this.savePrecaucoes();
      }
        else{
        this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
      }
    }
    savePrecaucoes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idPrecaucao').value != null) {
          this.precaucoesService.update(this.formulario.value)
          .subscribe(
            () => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroPrecaucaoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close();
              }, 500);
            }, (error) => {
              this.mensagemErro = error;
            }
          );
          }else {
            if (this.formulario.value.ativo != true){
              this.formulario.value.ativo = true;
            }
            this.precaucoesService.create(this.formulario.value)
            .subscribe(
              () => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroPrecaucaoComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close();
                }, 500);
              }, (error) => {
                this.mensagemErro = error;
              }
            );
          }
        }
      }
    }
