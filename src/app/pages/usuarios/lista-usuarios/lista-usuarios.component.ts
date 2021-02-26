import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  pesquisaForm: FormGroup = null;
  lista: Usuario[]=[];
  sucesso: boolean = false;
  searchText: string;
  pageSize = 10;
  page = 1;
  varConfirm: string;
  statusPesquisa: boolean = false;
  mensagem: string;
  usuarioAux: Usuario;
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private usuariosService: UsuarioService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadListaUsuarios();
    CadastroUsuarioComponent.atualizando.subscribe(
      () => {
          this.loadListaUsuarios();
        })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  public pesquisa(): void {
    this.statusPesquisa = true;
    this.loadListaUsuarios();
  }
  limpar() {
    this.pesquisaForm.reset;
    this.mensagem = null;
    this.statusPesquisa = false;
    this.loadListaUsuarios();
  }
  mudarStatus() {
    if (this.usuarioAux.ativo === true) {
      this.usuarioAux.ativo = false;
      this.usuariosService.disable(this.usuarioAux).subscribe(
        () => this.loadListaUsuarios()
      );
    } else {
      this.usuarioAux.ativo = true;
      this.usuariosService.disable(this.usuarioAux).subscribe(
        () => this.loadListaUsuarios()
      );
    }
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = "Cadastrar usuario";
  }
editar(id: number) {
  this.usuariosService.getById(id).subscribe((usuario) => {
    const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = "Editar usuario";
    modalRef.componentInstance.usuario = usuario;
  }
)
}
  refresh() {
    if (this.pesquisaForm.get('pesquisar').value === '') {
      this.mensagem = null;
       this.loadListaUsuarios();
    }
  }
  pegaId(id: number) {
    this.usuariosService.getById(id).subscribe((usuariosDis) => {
      if (usuariosDis.ativo === true) {
        this.varConfirm = 'desativar';
      } else {
        this.varConfirm = 'ativar';
      }
      this.usuarioAux = usuariosDis;
    });
  }
  loadListaUsuarios() {
    if (this.statusPesquisa === false) {
      this.usuariosService.getAll()
      .subscribe(
        data => {
          this.lista = data;
        });
      } else {
        if (this.pesquisaForm.valid) {
          this.usuariosService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
            data => {
              this.lista = data;
              if (this.lista.length <= 0) {
                this.mensagem = "Nenhum registro foi encontrado.";
              } else {
                this.mensagem = null;
              }
              this.statusPesquisa = false;
            });
          } else {
            this.usuariosService.getByNome(this.pesquisaForm.get('')).subscribe(
              data => {
                this.lista = data;
                this.mensagem = "Nenhum registro foi encontrado.";
              }
            )
          }
        }
      }
    }
