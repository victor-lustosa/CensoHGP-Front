import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  public formulario: FormGroup;
  @Input() public usuario: Usuario;
  tipoUsuarios: any[];
  sucesso: boolean = false;
  @Input() tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at: boolean = true;
  validaSenha: boolean = false;
  mensagemErro: string = '';

  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal,
    private usuariosService: UsuarioService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.novoFormulario();
    if (this.usuario != null) {
      this.updateForm(this.usuario);
    }
    this.tipoUsuarios = this.usuariosService.getTipoUsuariosForm();
  }
  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  private novoFormulario() {
    this.formulario = this.formBuilder.group({
      idUsuario: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      matricula: [null, [Validators.required]],
      ativo: [true],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      senhaNovamente: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      perfil: [1, [Validators.required]]
    });
  }
  aplicaCssErro(campo: any) {
    return {
      'border-red': this.verificaValidTouched(campo)
    };
  }
  updateForm(usuarios: Usuario) {
    this.formulario.patchValue({
      idUsuario: usuarios.idUsuario,
      nome: usuarios.nome,
      email: usuarios.email,
      matricula: usuarios.matricula,
      ativo: usuarios.ativo,
      senha: usuarios.senha,
      perfil: usuarios.perfil
    });
  }
  valid() {
    if (this.formulario.valid) {
      this.mensagemErro = '';
      this.saveUsuarios();
    }
    else {
      this.mensagemErro = 'Por favor, preencha os campos obrigatórios';
    }
  }
  saveUsuarios() {
    if (this.formulario.valid) {
      if (this.formulario.get('idUsuario').value != null) {
        if (this.formulario.get('senhaNovamente').value === this.formulario.get('senha').value) {
          this.usuariosService.update(this.formulario.value)
            .subscribe(
              () => {
                  this.sucesso = true,
                  this.formulario.reset(),
                CadastroUsuarioComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close();
                  }, 500);
              }, (error) => {
                this.mensagemErro = error;
              });
        } else {
          this.mensagemErro = "As senhas precisam ser iguais!";
        }
      } else {
        if (this.formulario.get('senhaNovamente').value === this.formulario.get('senha').value) {
          this.usuariosService.create(this.formulario.value)
            .subscribe(
              () => {
                  this.sucesso = true,
                  this.formulario.reset(),
                CadastroUsuarioComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close();
                  }, 500);
              }, (error) => {
                this.mensagemErro = error;
              });
        } else {
              this.mensagemErro = "As senhas precisam ser iguais!";
        }
      }
    }
  }
}
