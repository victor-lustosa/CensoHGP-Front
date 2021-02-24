import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FatorRiscoService } from '../service/fator-risco.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fator } from '../model/fator';
@Component({
  selector: 'app-cadastro-fator',
  templateUrl: './cadastro-fator.component.html',
  styleUrls: ['./cadastro-fator.component.scss'],

})
export class CadastroFatorComponent implements OnInit {
  @Input() public fatorRisco:Fator;
  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  mensagemErro: string = '';
  editar:boolean = false;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private fatoresService: FatorRiscoService,private formBuilder: FormBuilder) { }
    ngOnInit(): void {
      this.novoFormulario();
      if (this.fatorRisco != null) {
        this.updateForm(this.fatorRisco);
    }}
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    private novoFormulario(){
      this.formulario = this.formBuilder.group({
        idFatorRisco: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null],
        ativo: [true]
      })
    }
    valid(){
      if(this.formulario.valid){
        this.mensagemErro=''
        this.saveFatores()}
        else{
          this.mensagemErro = "Por favor, preencha os campos obrigatórios";
        }
      }
      updateForm(fatores: Fator) {
        this.formulario.patchValue({
          idFatorRisco: fatores.idFatorRisco,
          nome: fatores.nome,
          descricao: fatores.descricao,
          ativo: fatores.ativo
        })
      }
      saveFatores() {
        if (this.formulario.valid) {
          if (this.formulario.get('idFatorRisco').value != null) {
            this.fatoresService.update(this.formulario.value)
            .subscribe(
              () => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroFatorComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500)
              })}else{
                this.fatoresService.create(this.formulario.value)
                .subscribe(
                  () => {
                    this.sucesso = true,
                    this.formulario.reset(),
                    CadastroFatorComponent.atualizando.emit(this.at),
                    setTimeout(() => {
                      this.activeModal.close()
                    }, 500)
                  })
                }
              }
            }}
