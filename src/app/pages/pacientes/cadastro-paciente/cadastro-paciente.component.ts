import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../auth/service/storage.service';
import { Departamento } from '../../departamentos/model/departamento';
import { DepartamentoService } from '../../departamentos/service';
import { Precaucao } from '../../precaucoes/model/precaucao';
import { PrecaucaoService } from '../../precaucoes/service/precaucao.service';
import { Paciente } from '../model/Paciente';
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
  @Input() public paciente: Paciente;
  public pacienteUpdate: Paciente;
  static atualizando = new EventEmitter<boolean>();
  jwtHelper: JwtHelperService = new JwtHelperService();
  mensagemErro: string = '';
  constructor(public activeModal: NgbActiveModal, private pacientesService: PacienteService,
    private departamentoService: DepartamentoService, private formBuilder: FormBuilder,
    private precaucaoService: PrecaucaoService, private storage: StorageService) { }

  ngOnInit(): void {
    this.novoFormulario();
    if (this.paciente != null) {
      console.log(this.paciente)
      this.updateForm(this.paciente);
    }
    this.loadListaPrecaucoes();
    this.loadListaDepartamento();
    this.listaSexos = this.pacientesService.getSexos();
  }
  novoFormulario() {
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
  }
  updateForm(paciente: Paciente) {
    this.formulario.patchValue({
      idPaciente: paciente.matriculaUsuario,
      prontuario: paciente.prontuario,
      nome: paciente.nome,
      nomeMae: paciente.nomeMae,
      cpf: paciente.cpf,
      genero: paciente.genero,
      rg: paciente.rg,
      dataNascimento: paciente.dataNascimento,
      precaucao: paciente.precaucao,
      departamento: paciente.precaucao
    })
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
      if (this.formulario.get('prontuario').value != null) {
        this.pacienteUpdate = this.formulario.value as Paciente;
        console.log(this.pacienteUpdate)
        this.pacienteUpdate.idPaciente = this.paciente.idPaciente
        if (this.paciente.genero[0] == 1) {
          this.pacienteUpdate.genero = 1;
        } else if (this.paciente.genero[0] == 2) {
          this.pacienteUpdate.genero = 2;
        }
        this.pacientesService.updatePaciente(this.formulario.value,
          this.jwtHelper.decodeToken(this.storage.getLocalUser().token).sub.substring(13))
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
        this.pacientesService.createPaciente(this.formulario.value,
          this.jwtHelper.decodeToken(this.storage.getLocalUser().token).sub.substring(13))
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
