import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  @Input() public formulario: FormGroup;

  errors: String[];
  sucesso: boolean = false;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private usuariosService: UsuarioService) { }

    ngOnInit(): void {
    }
    verificaValidTouched(campo){
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    saveUsuarios() {
      if (this.formulario.valid) {
        if (this.formulario.get('idUsuario').value != null) {
          this.usuariosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroUsuarioComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500)
            })
          } else {
            this.usuariosService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroUsuarioComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500)
              })
            }
          }
        }
      }
