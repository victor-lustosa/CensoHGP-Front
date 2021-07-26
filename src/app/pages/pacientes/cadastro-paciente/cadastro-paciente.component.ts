import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cpuUsage } from 'process';
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
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {
  public formulario: FormGroup;
  today: string;
  // dataAtual: string;
  listaPrecaucoes: Precaucao[] = [];
  listaSexos: any[] = [];
  listaDepartamento: Departamento[] = [];
  sucesso: boolean = false;
  @Input() editar: boolean;
  at: boolean = true;
  departamento: string = '';
  genero: string = '';
  @Input() public paciente: Paciente;
  static atualizando = new EventEmitter<boolean>();
  jwtHelper: JwtHelperService = new JwtHelperService();
  mensagemErro: string = '';
  constructor(public activeModal: NgbActiveModal, private pacientesService: PacienteService,
    private departamentoService: DepartamentoService, private formBuilder: FormBuilder,
    private precaucaoService: PrecaucaoService, private storage: StorageService) { }

  ngOnInit(): void {
    this.novoFormulario();
    this.editar = false;

    // console.log(this.dataAtual,'oii essa é a adata');
    if (this.paciente != null) {
      this.editar = true;
      // this.today = new Date().toISOString().split('T')[0];

      this.updateForm(this.paciente);
      this.genero = this.formulario.get('genero').value;
      console.log(this.formulario.value)

    } else {

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
      cpf: [null, this.cpfValidator],
      genero: [null],
      rg: [null],
      dataNascimento: [null],
      precaucao: new FormArray([]),
      departamento: [null]
    });
  }
  cpfAux: string;
  cpfValidator(control: FormControl) {
    this.cpfAux = control.value;

    if (  this.cpfAux !== '') {
      const validaCPF = /(\d{3})(\d{3})(\d{3})(\d{2})/;
      return validaCPF.test(this.cpfAux) ? null : { cepInvalido: 'CPF inválido' };
    }
    return null;
  }


  updateForm(paciente: Paciente) {
    this.formulario.patchValue({
      idPaciente: paciente.idPaciente,
      prontuario: paciente.prontuario,
      nome: paciente.nome,
      nomeMae: paciente.nomeMae,
      cpf: paciente.cpf,
      rg: paciente.rg,
      dataNascimento: paciente.dataNascimento,
      precaucao: paciente.precaucao,
      departamento: paciente.departamento.idDepartamento,
      genero: paciente.genero[0]
    });
  }

  onCheckChange(event: { target: { checked: any; value: any; }; }) {
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
    this.precaucaoService.getAllAtivos().subscribe(
      data => {
        this.listaPrecaucoes = data;
      });
  }
  loadListaDepartamento() {
    this.departamentoService.getAllAtivos()
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
      if (this.formulario.get('prontuario').value != null && this.formulario.get('idPaciente').value != null) {
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
