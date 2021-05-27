import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../../departamentos/model/departamento';
import { DepartamentoService } from '../../departamentos/service';
import { Precaucao } from '../../precaucoes/model/precaucao';
import { PrecaucaoService } from '../../precaucoes/service/precaucao.service';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss'],
})
export class CadastroPacienteComponent implements OnInit {
  public formulario: FormGroup;
  listaPrecaucoes: Precaucao[] = [];
  listaSexos: any[] = [];
  listaDepartamento: Departamento[] = [];
  sucesso: boolean = false;
  at: boolean = true;
  static atualizando = new EventEmitter<boolean>();
  mensagemErro: string = '';
  constructor(public activeModal: NgbActiveModal, private pacientesService: PacienteService,
    private departamentoService: DepartamentoService, private formBuilder: FormBuilder,
    private precaucaoService: PrecaucaoService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idPaciente: [null],
      prontuario: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null],
      nomeMae: [null],
      cpf: [null],
      genero: [null],
      rg: [null],
      dataNascimento: [null],
      precaucao: new FormArray([]),
      departamento: [null]
    });
    this.loadListaPrecaucoes();
    this.loadListaDepartamento();
    this.listaSexos = this.pacientesService.getSexos();
  }

  onCheckChange(event) {
    const formArray: FormArray = this.formulario.get('precaucao') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  loadListaPrecaucoes() {
    this.precaucaoService.getAll().subscribe(
      data => {
        this.listaPrecaucoes = data;
      });
  }
  loadListaDepartamento() {
    this.departamentoService.getAll()
      .subscribe(
        data => {
          this.listaDepartamento = data;
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
  valid() {
    if (this.formulario.valid) {
      this.mensagemErro = '';
      this.savePacientes();
    }
    else {
      this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
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
                  this.activeModal.close();
                }, 500);
            }, (error) => {
              this.mensagemErro = error;
            });
      } else {
        this.pacientesService.create(this.formulario.value)
          .subscribe(
            () => {
              this.sucesso = true,
                this.formulario.reset(),
                CadastroPacienteComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close();
                }, 500);
            }, (error) => {
              this.mensagemErro = error;
            });
      }
    }
  }
}
