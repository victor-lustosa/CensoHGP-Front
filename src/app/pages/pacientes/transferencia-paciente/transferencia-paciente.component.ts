import { Transferencia } from '../model/Transferencia';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../../auth/service/storage.service';
import { Departamento } from '../../departamentos/model/departamento';
import { DepartamentoService } from '../../departamentos/service';

@Component({
  selector: 'app-transferencia-paciente',
  templateUrl: './transferencia-paciente.component.html',
  styleUrls: ['./transferencia-paciente.component.scss']
})
export class TransferenciaPacienteComponent implements OnInit {
  public formulario: FormGroup;
  @Input() idPaciente: number;
  @Input() nomePaciente: string;
  @Input() prontuario: string;
  listaDepartamento: Departamento[] = [];
  departamento: string = '';
  jwtHelper: JwtHelperService = new JwtHelperService();

  static atualizando = new EventEmitter<boolean>();
  transferencia: Transferencia;
  sucesso: boolean = false;
  at: boolean = true;
  mensagemErro: string = '';

  constructor(
    private storage: StorageService, 
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private pacientesService: PacienteService
  ) { }

  ngOnInit(): void {
    this.loadListaDepartamento();
    this.formulario = this.formBuilder.group({
      idTransferencia: [null],
      departamento: [null],
      observacao: [null]
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
      this.saveTransferencias();
    }else {
      this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
    }
  }

  saveTransferencias() {
    if (this.formulario.valid) {
      this.transferencia = this.formulario.value as Transferencia;
      this.transferencia.matriculaUsuario = this.jwtHelper.decodeToken(this.storage.getLocalUser().token).sub.substring(13);
      this.transferencia.idPaciente= this.idPaciente;
      if (this.transferencia != null) {
        this.pacientesService.createTransferencia(this.transferencia)
        .subscribe(
          () => {
            this.sucesso = true,
            this.formulario.reset(),
            TransferenciaPacienteComponent.atualizando.emit(this.at),
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