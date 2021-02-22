import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoService } from '../service';

@Component({
  selector: 'app-cadastro-departamento',
  templateUrl: './cadastro-departamento.component.html',
  styleUrls: ['./cadastro-departamento.component.scss']
})
export class CadastroDepartamentoComponent implements OnInit {

  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  erroBack:string = '';
  listaTipoDepartamento: any[];
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  mensagemErro:string='';
  constructor(
    public activeModal: NgbActiveModal,private departamentosService: DepartamentoService) { }

    ngOnInit(): void {
      this.listaTipoDepartamento = this.departamentosService.getTipoDepartamentos();
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
        this.mensagemErro=''
        this.saveDepartamentos()}
        else{
        this.mensagemErro = "Por favor, preencha os campos obrigatórios";
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
                this.activeModal.close()
              }, 500);
            },
            (error) => {
              this.erroBack = error;
            }
          )
        }
        else {
          this.departamentosService.create(this.formulario.value)
          .subscribe(
            () => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroDepartamentoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500);
            },
            (error) => {
              this.erroBack = error;
            }
          )
        }
      }
    }
  }
