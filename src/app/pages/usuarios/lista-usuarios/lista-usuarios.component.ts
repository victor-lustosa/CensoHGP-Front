import { Component, OnInit } from '@angular/core';
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
  searchText: string;
  paginaAtual: number = 1 ;
  contador: number = 10;
  lista: Usuario[] = [];
  sucesso: boolean = false;
  statusSpinner: boolean = false;
  varConfirm: string;
  mensagem: string;
  usuarioAux: Usuario;
  tipoUsuario: number = 1;
  listaTipoUsuario: any[];
  ativo: number = 1;
  listaAtivo: any[];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private usuariosService: UsuarioService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadListaUsuarios();
    this.listaTipoUsuario = this.usuariosService.getTipoUsuarios();
    this.listaAtivo = this.usuariosService.getStatusUsuarios();
    CadastroUsuarioComponent.atualizando.subscribe(
      () => {
        this.loadListaUsuarios();
      });
    }
    verifica(){
      this.paginaAtual = 1;
    }
    limpar() {
      this.searchText = '';
    }
    filtroTipoUsuario(value: any) {
      this.tipoUsuario = value;
      this.loadListaUsuarios();
    }
    filtroStatus(value: any) {
      this.ativo = value;
      this.loadListaUsuarios();
    }
    mudarStatus() {
      if(this.usuarioAux.perfil[0] == 'Administrador'){
        this.usuarioAux.perfil = 1;
      } else if(this.usuarioAux.perfil[0] == 'Enfermeiro'){
        this.usuarioAux.perfil = 2;
      }
        this.usuariosService.disable(this.usuarioAux).subscribe(
          () => this.loadListaUsuarios()
        );
    }
    cadastrar() {
      const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Cadastrar usuário';
    }
    editar(id: number) {
      this.usuariosService.getById(id).subscribe((usuario) => {
        const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = 'Editar usuário';
        modalRef.componentInstance.usuario = usuario;
      }
    );
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
    this.lista =  [];
    this.statusSpinner = true;
    if (this.tipoUsuario == 2 && this.ativo == 3) {
      setTimeout(() => {
        this.usuariosService.getAllEnfermeirosInativos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.tipoUsuario == 3 && this.ativo == 3) {
      setTimeout(() => {
        this.usuariosService.getAllAdministradoresInativos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.tipoUsuario == 3 && this.ativo == 2) {
      setTimeout(() => {
        this.usuariosService.getAllAdministradoresAtivos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.tipoUsuario == 2 && this.ativo == 2 ) {
      setTimeout(() => {
        this.usuariosService.getAllEnfermeirosAtivos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.tipoUsuario == 2) {
      setTimeout(() => {
        this.usuariosService.getAllEnfermeiros().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.tipoUsuario == 3) {
      setTimeout(() => {
        this.usuariosService.getAllAdministradores().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }

    else if (this.ativo == 2) {
      setTimeout(() => {
        this.usuariosService.getAllAtivos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.ativo == 3) {
      setTimeout(() => {
        this.usuariosService.getAllInativos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
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
