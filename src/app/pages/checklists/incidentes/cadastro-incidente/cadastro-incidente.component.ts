import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenteService } from '../service/incidente.service';

import { Incidente } from '../model/incidente';

@Component({
  selector: 'app-cadastro-incidente',
  templateUrl: './cadastro-incidente.component.html',
  styleUrls: ['./cadastro-incidente.component.scss']
})
export class CadastroIncidenteComponent implements OnInit {
   public formulario: FormGroup;
   @Input() public incidente: Incidente;
  errors: String[];
  sucesso: boolean = false;
  @Input() tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  mensagemErro: string = '';
  erroBack: string = '';
  constructor(
    public activeModal: NgbActiveModal, private incidentesService: IncidenteService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.novoFormulario();
      if (this.incidente != null) {
        this.updateForm(this.incidente);
      }

    }

    novoFormulario(){
      this.formulario = this.formBuilder.group({
        idIncidente: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null],
        ativo: [true]
      })
    }

    updateForm(incidentes: Incidente) {
      this.formulario.patchValue({
        idIncidente: incidentes.idIncidente,
        nome: incidentes.nome,
        descricao: incidentes.descricao,
        ativo: incidentes.ativo
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
    valid(){
      if (this.formulario.valid){
        this.mensagemErro = '';
        this.saveIncidentes();
      }
      else{
        this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
      }
    }
    saveIncidentes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idIncidente').value != null) {
          this.incidentesService.update(this.formulario.value)
          .subscribe(
            () => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              CadastroIncidenteComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close();
              }, 500);
            },
            (error) => {
              this.erroBack = error;
            });
          }else{
            this.incidentesService.create(this.formulario.value)
            .subscribe(
              () => {
                this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                CadastroIncidenteComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close();
                }, 500);
              },
              (error) => {
                this.erroBack = error;
              });
            }
          }
        }
      }
