import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormValidations } from 'src/app/theme/shared/form-validations';
import { Departamento } from '../../departamentos/model/departamento';
import { DepartamentoService } from '../../departamentos/service';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss'],
})
export class CadastroPacienteComponent implements OnInit {
  @Input() public formulario: FormGroup;
  @Input() public listaPrecaucoes = [];
  listaSexos:any[]=[];
  listaDepartamento:Departamento[]=[];
  sucesso: boolean = false;
  at:boolean = true;
  static atualizando = new EventEmitter<boolean>();
  mensagemErro: string = '';
  constructor( public activeModal: NgbActiveModal,private pacientesService: PacienteService,private departamentoService:DepartamentoService) { }

  ngOnInit(): void {
    this.loadListaDepartamento();
    this.getPrecaucoes();
    this.listaSexos = this.pacientesService.getSexos();

  }
  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      listaPrecaucoes: valueSubmit.listaPrecaucoes.map((v: any, i: string | number) => v ? this.listaPrecaucoes[i] : null)
      .filter((v: any) => v !== null)
    });

  }

  getPrecaucoes(){
    return this.formulario.get('precaucao') ? (<FormArray>this.formulario.get('precaucao')).controls : null;
  }
  loadListaDepartamento() {
    this.departamentoService.getAll()
    .subscribe(
      data => {
        this.listaDepartamento = data;
        // console.log('erer',this.listaDepartamento)
      })
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
      if(this.formulario.valid){
        this.mensagemErro=''
        this.savePacientes()}
        else{
          this.mensagemErro = "Por favor, preencha os campos obrigatórios";
        }
      }
      savePacientes() {
        if (this.formulario.valid) {
          if (this.formulario.get('idPaciente').value != null) {
            this.pacientesService.update(this.formulario.value)
            .subscribe(
              () => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroPacienteComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500)
              })
            } else {
              this.pacientesService.create(this.formulario.value)
              .subscribe(
                () => {
                  this.sucesso = true,
                  this.formulario.reset(),
                  CadastroPacienteComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close()
                  }, 500)
                }
              )
            }
          }
        }
      }
