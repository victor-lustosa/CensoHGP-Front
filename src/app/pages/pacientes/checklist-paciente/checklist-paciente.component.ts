import { Checklist } from './../model/Checklist';
import { FatorRiscoService } from './../../checklists/fatores-risco/service/fator-risco.service';
import { Fator } from './../../checklists/fatores-risco/model/fator';
import { Incidente } from './../../checklists/incidentes/model/incidente';
import { Procedimento } from './../../checklists/procedimentos/model/procedimento';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IncidenteService } from '../../checklists/incidentes/service/incidente.service';
import { ProcedimentoService } from '../../checklists/procedimentos/service/procedimento.service';
import { PacienteService } from '../service/paciente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../../auth/service/storage.service';

@Component({
  selector: 'app-checklist-paciente',
  templateUrl: './checklist-paciente.component.html',
  styleUrls: ['./checklist-paciente.component.scss']
})
export class ChecklistPacienteComponent implements OnInit {

  public formulario: FormGroup;
  listaProcedimentos: Procedimento[] = [];
  listaIncidentes: Incidente[] = [];
  listaFatoresRisco: Fator[] = [];
  @Input() idPaciente: number;

  jwtHelper: JwtHelperService = new JwtHelperService();

  static atualizando = new EventEmitter<boolean>();
checklist : Checklist;

  sucesso: boolean = false;
  at: boolean = true;

  mensagemErro: string = '';
  constructor(  private storage: StorageService,public activeModal: NgbActiveModal, private pacientesService: PacienteService,
    private incidenteService: IncidenteService, private formBuilder: FormBuilder, private fatorRiscoService: FatorRiscoService,
    private procedimentoService: ProcedimentoService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idChecklist: [null],
      incidente: new FormArray([]),
      procedimento: new FormArray([]),
      fatorRisco: new FormArray([]),
      observacao: [null]

    });
    this.loadListaIncidentes();
    this.loadListaFatoresRisco();
    this.loadListaProcedimentos();


  }

  onCheckChangeIncidente(event) {
    const formArray: FormArray = this.formulario.get('incidente') as FormArray;
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
  onCheckChangeProcedimento(event) {
    const formArray: FormArray = this.formulario.get('procedimento') as FormArray;
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

  onCheckChangeFatorRisco(event) {
    const formArray: FormArray = this.formulario.get('fatorRisco') as FormArray;
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

  loadListaIncidentes() {
    this.incidenteService.getAll().subscribe(
      data => {
        this.listaIncidentes = data;
      });
  }

  loadListaProcedimentos() {
    this.procedimentoService.getAll()
      .subscribe(
        data => {
          this.listaProcedimentos = data;
        });
  }

  loadListaFatoresRisco() {
    this.fatorRiscoService.getAll()
      .subscribe(
        data => {
          this.listaFatoresRisco = data;
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
      this.saveChecklists();
    }
    else {
      this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
    }
  }
  saveChecklists() {
    if (this.formulario.valid) {





      this.formulario.patchValue({
        incidente: this.checklist.incidente,
        // procedimento: this.checklist.procedimento,
        // fatorRisco: this.checklist.fatorRisco,
        // observacao: this.checklist.observacao

      });
this.checklist.matriculaUsuario = this.jwtHelper.decodeToken(this.storage.getLocalUser().token).sub.substring(13);
this.checklist.idPaciente = this.idPaciente;
if(this.checklist != null){
  console.log('Checklist ' , this.checklist);
        this.pacientesService.createChecklist(this.checklist)
          .subscribe(
            () => {
              this.sucesso = true,
                this.formulario.reset(),
                ChecklistPacienteComponent.atualizando.emit(this.at),
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
