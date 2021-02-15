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
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private usuariosService: UsuarioService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaUsuarios();
    this.formularioCadastro = this.formBuilder.group({
      idUsuario: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null,[Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
      matricula: [null, [Validators.required]],
      ativo: [true],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      admin:[null]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idUsuario: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null,[Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
      matricula: [null, [Validators.required]],
      ativo: [true],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      admin:[null]
    })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  pesquisa(){}
  limpar(){
    this.searchText = '';
    return this.searchText;
  }
  mudarStatus(){}
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
  loadListaUsuarios() {
    this.usuariosService.getAll()
    .subscribe(
      data => {
        this.lista = data;
        console.log(data);
      },
      error => {
        console.log('Erro serviço ' + error)
      })
    }
  }
