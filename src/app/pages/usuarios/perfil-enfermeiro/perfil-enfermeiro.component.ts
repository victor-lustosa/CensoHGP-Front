import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-perfil-enfermeiro',
  templateUrl: './perfil-enfermeiro.component.html',
  styleUrls: ['./perfil-enfermeiro.component.scss']
})
export class PerfilEnfermeiroComponent implements OnInit {
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
    this.perfil = this.usuario.perfil;
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
      nome: [null],
      email: [null],
      matricula: [null],
      ativo: [null],
      senha: ['', [Validators.minLength(3), Validators.maxLength(35)]],
      senhaNovamente: ['', [Validators.minLength(3), Validators.maxLength(35)]],
      perfil: [null, [Validators.required]]
    });
  }

  updateForm(usuario: Usuario) {
    this.formulario.patchValue({
      idUsuario: usuario.idUsuario,
      nome: usuario.nome,
      email: usuario.email,
      matricula: usuario.matricula,
      ativo: usuario.ativo,
      perfil: usuario.perfil
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
