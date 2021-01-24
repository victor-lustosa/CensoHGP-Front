import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder} from '@angular/forms';
import { IncidenteService } from '../service/incidente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-incidentes',
  templateUrl: './cadastro-incidentes.component.html',
  styleUrls: ['./cadastro-incidentes.component.scss']
})
export class CadastroIncidentesComponent implements OnInit {
  @Input() public formulario: FormGroup;


  errors: String[];
  sucesso: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,private incidentesService: IncidenteService, private formBuilder: FormBuilder
    , location:Location) { }

    ngOnInit(): void {
      console.log('id recebido no cadastro modal:' + this.formulario.get('idIncidente').value);
    }

    saveIncidentes() {
      // editar um Fator
      if (this.formulario.valid) {
        console.log('save incidentes id incidente  do formulario: '+this.formulario.value.idIncidente +'id injetado pelo modal: '+ this.formulario.get('idIncidente').value)
        if ( this.formulario.get('idIncidente').value != null) {
          this.incidentesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true
              console.log(sucess),
              console.log('fator salvo com sucesso'),
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000);
            },
            errorResponse => {
              console.log('Erro ao atualizar incidentes , servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator .']
            })
          } else {
            //salvar um fator
            this.incidentesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                console.log('fator salvo com sucesso'),
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000);

              },
              errorResponse => {
                console.log('Erro no salvar incidentes , servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }



      }
