import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
      tipousuario:[null]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idUsuario: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null,[Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
      matricula: [null, [Validators.required]],
      ativo: [true],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      tipousuario:[null]
    })
  }
  limpar(){
    this.searchText = '';
    return this.searchText;
  }
  cadastrar(){
    let ngbModalOptions: NgbModalOptions = {
      keyboard : true,
      size : 'lg'
    };
    const modalRef = this.modalService.open(CadastroUsuarioComponent, ngbModalOptions)
    modalRef.componentInstance.formulario = this.formularioCadastro;
  }

  atualizar() {
    let ngbModalOptions: NgbModalOptions = {
      keyboard : true,
      size : 'lg'
    };
    const modalRef = this.modalService.open(CadastroUsuarioComponent, ngbModalOptions);
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
      tipousuario:usuarios.tipousuario
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
