import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss']
})
export class PerfilAdminComponent implements OnInit {
  @Input() usuario: Usuario;
  public formulario: FormGroup;
  mensagemErro: string = '';
  sucesso: boolean = false;
  perfil: string = '';
  listaPerfis: string[];
  constructor(public activeModal: NgbActiveModal, public modalService: NgbModal,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm(this.usuario);
    this.perfil = this.usuario.perfil
    this.novoFormulario();

  this.loadListaPerfis();
  }

  loadListaPerfis() {
    this.usuarioService.getTipoUsuarios().subscribe(
      data => {
        this.listaPerfis = data;
      });
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
      perfil: [null, [Validators.required]]
    });
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
  aplicaCssErro(campo: any) {
    return {
      'border-red': this.verificaValidTouched(campo)
    };
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

  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  saveUsuarios() {
    if (this.formulario.valid) {
      if (this.formulario.get('idUsuario').value != null) {
        if (this.formulario.get('senhaNovamente').value === this.formulario.get('senha').value) {
          this.usuarioService.update(this.formulario.value)
            .subscribe(
              () => {
                this.sucesso = true,
                  this.formulario.reset(),

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
          this.usuarioService.create(this.formulario.value)
            .subscribe(
              () => {
                this.sucesso = true,
                  this.formulario.reset(),

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
