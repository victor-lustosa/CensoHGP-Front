import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY } from 'rxjs';
import { TipoUsuarioService } from '../service/tipo-usuario.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  @Input() public formulario: FormGroup;
  tipoUsuarios:any[];
  errors: String[];
  sucesso: boolean = false;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  senhaNovamente:string=null;
  validaSenha:boolean=false;
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal,
    private usuariosService: UsuarioService,private tipoUsuarioService: TipoUsuarioService) { }

    ngOnInit(): void {
      this.tipoUsuarios = this.tipoUsuarioService.getTipoUsuarios();

    }
    verificaValidTouched(campo:any){
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
            console.log(this.formulario.get('senha').value)
            if(this.senhaNovamente === this.formulario.get('senha').value){
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
              } else{
                this.validaSenha=true;
              }
            }
          }
        }
      }
