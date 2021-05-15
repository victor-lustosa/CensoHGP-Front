import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../model/departamento';
import { DepartamentoService } from '../service';

@Component({
  selector: 'app-cadastro-departamento',
  templateUrl: './cadastro-departamento.component.html',
  styleUrls: ['./cadastro-departamento.component.scss']
})
export class CadastroDepartamentoComponent implements OnInit {

  public formulario: FormGroup;
  @Input() public departamento: Departamento;
  errors: String[];
  sucesso: boolean = false;
  erroBack: string = '';
  listaTipoDepartamento: any[];
  @Input() tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at: boolean = true;
  mensagemErro: string = '';
  constructor(
    public activeModal: NgbActiveModal, private departamentosService: DepartamentoService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.listaTipoDepartamento = this.departamentosService.getTipoDepartamentos();
      this.novoFormulario();
      if (this.departamento != null) {
        this.updateForm(this.departamento);
      }
    }

    novoFormulario(){
      this.formulario = this.formBuilder.group({
        idDepartamento: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        numero_leitos: [null, [Validators.required, Validators.nullValidator]],
        ativo: [true],
        interno: [true, [Validators.required]],
        descricao: [null]
      });
    }

    updateForm(departamentos: Departamento) {
      this.formulario.patchValue({
        idDepartamento: departamentos.idDepartamento,
        nome: departamentos.nome,
        numero_leitos: departamentos.numero_leitos,
        ativo: departamentos.ativo,
        interno: departamentos.interno,
        descricao: departamentos.descricao
      });
    }

    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo?: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    valid(){
      if(this.formulario.valid){
        this.mensagemErro = '';
        this.saveDepartamentos();
      }
        else{
        this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
      }
    }
    saveDepartamentos() {
      this.erroBack = '';
      if (this.formulario.valid) {
        if ( this.formulario.get('idDepartamento').value != null) {
          this.departamentosService.update(this.formulario.value)
          .subscribe(
            () => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroDepartamentoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close();
              }, 500);
            },
            (error) => {
              this.erroBack = error;
            }
          );
        }
        else {
          this.departamentosService.create(this.formulario.value)
          .subscribe(
            () => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroDepartamentoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close();
              }, 500);
            },
            (error) => {
              this.erroBack = error;
            }
          );
        }
      }
    }
  }
