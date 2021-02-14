import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IncidenteService } from '../service/incidente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-incidente',
  templateUrl: './cadastro-incidente.component.html',
  styleUrls: ['./cadastro-incidente.component.scss']
})
export class CadastroIncidenteComponent implements OnInit {
  @Input() public formulario: FormGroup;


  errors: String[];
  sucesso: boolean = false;
  erro: boolean = false;
  mensagemErro: string;
  tituloModal: string;

  constructor(
    public activeModal: NgbActiveModal, private incidentesService: IncidenteService, private formBuilder: FormBuilder
    , location: Location) { }

    ngOnInit(): void {}

    saveIncidentes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idIncidente').value != null) {
          this.incidentesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000);
            })
          } else {
            if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
              this.erro = true;
              this.mensagemErro = "O nome é obrigatório.";
            } else {
              this.incidentesService.create(this.formulario.value)
              .subscribe(
                sucess => {
                  this.formulario,
                  this.sucesso = true,
                  setTimeout(() => {
                    this.activeModal.close(),
                    location.reload();
                  }, 1000);
                })
              }
            }
          } else {
            if (this.formulario.value.nome == null || this.formulario.value.nome == "" || this.formulario.value.nome == " ") {
              this.erro = true;
              this.mensagemErro = "O nome é obrigatório.";
            }
          }
        }
      }
