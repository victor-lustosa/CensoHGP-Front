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
    this.novoFormulario();
    this.loadListaPerfis();
    this.perfil = this.usuario.perfil
    this.updateForm(this.usuario);
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
      matricula: [null],
      ativo: [null],
      senha: [null, [Validators.minLength(3), Validators.maxLength(35)]],
      senhaNovamente: [null, [Validators.minLength(3), Validators.maxLength(35)]],
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


      if (this.formulario.get('senhaNovamente').value == this.formulario.get('senha').value || (this.formulario.get('senhaNovamente').value == '' && this.formulario.get('senha').value == '')) {
      this.usuario = this.formulario.value as Usuario;
      this.usuario.perfil = this.usuario.perfil[0]
      this.usuarioService.update(this.usuario)
          .subscribe(
            () => {
              this.sucesso = true,
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
