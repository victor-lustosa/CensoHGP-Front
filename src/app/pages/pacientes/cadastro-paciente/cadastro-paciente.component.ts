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
  verificaCPF: boolean = false;

  @Input() public paciente: Paciente;
  static atualizando = new EventEmitter<boolean>();
  jwtHelper: JwtHelperService = new JwtHelperService();
  mensagemErro: string = '';
  constructor(public activeModal: NgbActiveModal, private pacientesService: PacienteService,
    private departamentoService: DepartamentoService, private formBuilder: FormBuilder,
    private precaucaoService: PrecaucaoService, private storage: StorageService) { }

  ngOnInit(): void {

    console.log(this.verificaCPF);
    this.novoFormulario();
    this.editar = false;

    // console.log(this.dataAtual,'oii essa é a adata');
    if (this.paciente != null) {
      this.editar = true;
      // this.today = new Date().toISOString().split('T')[0];

      this.updateForm(this.paciente);
      this.genero = this.formulario.get('genero').value;
      console.log(this.formulario.value);

    } else {

    }
    this.loadListaPrecaucoes();
    this.loadListaDepartamento();
    this.listaSexos = this.pacientesService.getSexos();
  }


  cpfValidator(cpf: string) {



    let cpfAux = cpf;
    if (cpfAux.length == 11) {

      let soma;
      let resto;
      soma = 0;
      //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
      if (cpfAux == '00000000000' || cpfAux == '11111111111' || cpfAux == '22222222222' || cpfAux == '33333333333' ||
        cpfAux == '44444444444' || cpfAux == '55555555555' || cpfAux == '66666666666' || cpfAux == '77777777777' ||
        cpfAux == '88888888888' || cpfAux == '99999999999') {

        this.verificaCPF = true;
        return true;
      }
      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpfAux.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;
      if ((resto == 10) || (resto == 11)) {
        resto = 0;
      }
      if (resto != parseInt(cpfAux.substring(9, 10))) {

        this.verificaCPF = true;
        return true;
      }
      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpfAux.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;
      if ((resto == 10) || (resto == 11)) {
        resto = 0;
      }
      if (resto != parseInt(cpfAux.substring(10, 11))) {
        this.verificaCPF = true;
        return true;
      }
      return false;
    }
    else {
      return false;
    }


  }
  novoFormulario() {
    this.formulario = this.formBuilder.group({
      idPaciente: [null],
      prontuario: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null],
      nomeMae: [null],
      cpf: ['', Validators.maxLength(11)],
      genero: [null],
      rg: [null],
      dataNascimento: [null],
      precaucao: new FormArray([]),
      departamento: [null]
    });
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

    if (campo == 'cpf' && !this.formulario.get('cpf').valid && this.formulario.get('cpf').touched || this.formulario.get('cpf').valid && this.cpfValidator(this.formulario.get('cpf').value) == true) {
      this.verificaCPF = true;
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    if (campo == 'cpf' && this.cpfValidator(this.formulario.get('cpf').value) == false) {
      this.verificaCPF = false;
      return '';
    }

    else {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }

  }

  valid() {
    if (this.formulario.valid) {

      this.mensagemErro = '';
      this.savePacientes();


    }
    else if (!this.formulario.get('cpf').valid) {
      this.verificaCPF = true;
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
