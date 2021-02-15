import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup} from '@angular/forms';
import { ProcedimentoService } from '../service/procedimento.service';

@Component({
  selector: 'app-cadastro-procedimento',
  templateUrl: './cadastro-procedimento.component.html',
  styleUrls: ['./cadastro-procedimento.component.scss'],
  providers:[ProcedimentoService]

})
export class CadastroProcedimentoComponent implements OnInit {
  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
   at:boolean = true;
  constructor(
    public activeModal: NgbActiveModal, private procedimentosService: ProcedimentoService) { }

    ngOnInit(): void {}
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    saveProcedimentos() {
      if (this.formulario.valid) {
        if (this.formulario.get('idProcedimento').value != null) {
          this.procedimentosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              CadastroProcedimentoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close();
              }, 500);
            })
          } else {
              this.procedimentosService.create(this.formulario.value)
              .subscribe(
                sucess => {
                  this.formulario,
                  this.sucesso = true,
                  this.formulario.reset(),
                  CadastroProcedimentoComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close();
                  }, 500);
                })
              }
            }
          }
      }
