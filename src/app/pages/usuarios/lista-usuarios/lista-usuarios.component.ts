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
  paginaAtual : number = 1 ;
  contador : number = 10;
  lista: Usuario[] = [];
  sucesso: boolean = false;
  statusSpinner: boolean = false;
  varConfirm: string;
  mensagem: string;
  usuarioAux: Usuario;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private usuariosService: UsuarioService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadListaUsuarios();
    CadastroUsuarioComponent.atualizando.subscribe(
      () => {
        this.loadListaUsuarios();
      })
  }
  verifica(){
    this.paginaAtual = 1;
  }
  limpar() {
    this.searchText ='';
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
    modalRef.componentInstance.tituloModal = "Cadastrar usuário";
  }
  editar(id: number) {
    this.usuariosService.getById(id).subscribe((usuario) => {
      const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Editar usuário";
      modalRef.componentInstance.usuario = usuario;
    }
    )
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
    this.lista = [];
    this.statusSpinner = true;
      setTimeout(() => {
        this.usuariosService.getAll()
          .subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            });
      }, 400)
  }
}
