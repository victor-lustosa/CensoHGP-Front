import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { IncidenteService } from '../service/incidente.service';

@Component({
  selector: 'app-cadastro-incidente',
  templateUrl: './cadastro-incidente.component.html',
  styleUrls: ['./cadastro-incidente.component.scss']
})
export class CadastroIncidenteComponent implements OnInit {
  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  constructor(
    public activeModal: NgbActiveModal, private incidentesService: IncidenteService) { }

    ngOnInit(): void {}
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    saveIncidentes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idIncidente').value != null) {
          this.incidentesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              CadastroIncidenteComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500);
            })
          }else{
            this.incidentesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                CadastroIncidenteComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500);
              })
            }
          }
        }
      }
