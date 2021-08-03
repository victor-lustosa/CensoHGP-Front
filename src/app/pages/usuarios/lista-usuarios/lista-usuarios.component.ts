import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';
import { StorageService } from '../../auth/service/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  searchText: string;
  paginaAtual: number = 1;
  contador: number = 10;
  lista: Usuario[] = [];
  sucesso: boolean = false;
  statusSpinner: boolean = false;
  varConfirm: string;
  usuarioAux: Usuario;
  perfil: string = '';
  listaPerfis: string[];
  ativo: any = '';
  listaAtivo: any[];
  mensagemErro: string = '';
  jwtHelper: JwtHelperService = new JwtHelperService();
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private usuariosService: UsuarioService, public modalService: NgbModal, private storage: StorageService) { }

  ngOnInit(): void {
    this.loadListaUsuarios();
    this.loadListaPerfis();
    this.listaAtivo = this.usuariosService.getStatusUsuarios();
    CadastroUsuarioComponent.atualizando.subscribe(
      () => {
        this.loadListaUsuarios();
      });
  }
  verifica() {
    this.paginaAtual = 1;
  }
  limpar() {
    this.searchText = '';
  }
  filtroTipoUsuario(value: any) {
    this.perfil = value;
    this.loadListaUsuarios();
  }
  filtroStatus(value: any) {
    this.ativo = value;
    this.loadListaUsuarios();
  }
  mudarStatus() {
    this.usuarioAux.perfil = this.usuarioAux.perfil[0];
    this.usuariosService.disableUsuario(this.usuarioAux,
      this.jwtHelper.decodeToken(this.storage.getLocalUser().token).sub.substring(13)).subscribe(
      () => this.loadListaUsuarios(),
      (error) => {
        console.log(error);
        this.mensagemErro = error;
        setTimeout(() => {
        this.mensagemErro = '';
      }, 2500);
    });
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Cadastrar usuário';
  }
  editar(usuario: Usuario) {
    const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Editar usuário';
    modalRef.componentInstance.usuario = usuario;
  }
  pegaUsuario(usuario: Usuario) {
    if (usuario.ativo === true) {
      this.varConfirm = 'desativar';
    } else {
      this.varConfirm = 'ativar';
    }
      this.usuarioAux = usuario;
  }
  loadListaPerfis() {
    this.usuariosService.getTipoUsuarios().subscribe(
      data => {
        this.listaPerfis = data;
      });
  }
  loadListaUsuarios() {
    this.statusSpinner = true;
    this.lista = [];
    this.paginaAtual = 1;
    if (this.perfil != '' || this.ativo != '') {
      setTimeout(() => {
        this.usuariosService.getPorFiltros(this.perfil, this.ativo)
        .subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          });
      }, 400);
    }
    else {
      setTimeout(() => {
        this.usuariosService.getAll()
          .subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            });
      }, 400);
    }
  }
}
