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
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  idFator:number = 0;
  status: boolean;
  lista: Usuario[]=[];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  pageSize = 10;
  page = 1;
  pesquisaForm: FormGroup = null;
  varConfirm: string;
  statusPesquisa: boolean = false;
  mensagem: string;
  usuarioAux: Usuario;
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private usuariosService: UsuarioService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaUsuarios();
    CadastroUsuarioComponent.atualizando.subscribe(
      success => {
          this.loadListaUsuarios();
        })
    this.formularioCadastro = this.formBuilder.group({
      idUsuario: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null,[Validators.required, Validators.email]],
      matricula: [null, [Validators.required]],
      ativo: [true],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      admin:[null,[Validators.required]]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idUsuario: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null,[Validators.required, Validators.email]],
      matricula: [null, [Validators.required]],
      ativo: [true],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      admin:[null,[Validators.required]]
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
        sucess => this.loadListaUsuarios()
      );
    } else {
      this.usuarioAux.ativo = true;
      this.usuariosService.disable(this.usuarioAux).subscribe(
        sucess => this.loadListaUsuarios()
      );
    }
  }
  cadastrar(){
    const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS)
    modalRef.componentInstance.formulario = this.formularioCadastro;
  }

  atualizar() {
    const modalRef = this.modalService.open(CadastroUsuarioComponent, this.MODALOPTIONS);
    if(this.formularioAtualizar != null){
      modalRef.componentInstance.formulario = this.formularioAtualizar;

    }
  }
  editar(id:number){
    this.usuariosService.getById(id).subscribe((usuarios) => {
      console.log(usuarios);
      this.updateForm(usuarios);
      console.log(this.formularioAtualizar)
      if(this.formularioAtualizar != null){
        this.atualizar();
      }
    })
  }
  updateForm(usuarios: Usuario){
    this.formularioAtualizar.patchValue({
      idUsuario: usuarios.idUsuario,
      nome: usuarios.nome,
      email: usuarios.email,
      matricula: usuarios.matricula,
      ativo: usuarios.ativo,
      senha: usuarios.senha,
      admin:usuarios.admin
    })
  }
  pegaId(id: number) {
    this.usuariosService.getById(id).subscribe((usuariosDis) => {
      console.log('usuariodis', usuariosDis);
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
