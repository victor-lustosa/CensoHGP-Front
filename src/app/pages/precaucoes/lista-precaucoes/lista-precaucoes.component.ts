import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Precaucao} from './../model/precaucao';
import {PrecaucaoService} from './../service/precaucao.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPrecaucaoComponent } from '../cadastro-precaucao/cadastro-precaucao.component';
@Component({
  selector: 'app-lista-precaucoes',
  templateUrl: './lista-precaucoes.component.html',
  styleUrls: ['./lista-precaucoes.component.scss']
})
export class ListaPrecaucoesComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  idFator:number = 0;
  lista: Precaucao[]=[];
  msgError: string;
  sucesso: boolean = false;
  pageSize = 10;
  page = 1;
  precaucaoAux: Precaucao;
  varConfirm: string;
  pesquisaForm: FormGroup = null;
    MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private precaucoesService: PrecaucaoService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaPrecaucoes();
    this.formularioCadastro = this.formBuilder.group({
      idPrecaucao: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idPrecaucao: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  limpar(){
  }
  pesquisa(){}
  cadastrar(){
    const modalRef = this.modalService.open(CadastroPrecaucaoComponent, this.MODALOPTIONS)
    modalRef.componentInstance.formulario = this.formularioCadastro;
    modalRef.componentInstance.tituloModal = "Cadastrar precaução";
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroPrecaucaoComponent, this.MODALOPTIONS);
    if(this.formularioAtualizar != null){
      modalRef.componentInstance.tituloModal = "Editar precaução";
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
  }
  editar(id:number){
    this.precaucoesService.getById(id).subscribe((precaucoes) => {
      this.updateForm(precaucoes);
      if(this.formularioAtualizar != null){
        this.atualizar();
      }
    })
  }
  updateForm(precaucoes: Precaucao){
    this.formularioAtualizar.patchValue({
      idPrecaucao: precaucoes.idPrecaucao,
      nome:precaucoes.nome,
      descricao: precaucoes.descricao,
      ativo: precaucoes.ativo
    })
  }
  loadListaPrecaucoes() {
    this.precaucoesService.getAll()
    .subscribe(
      data => {
        this.lista = data;
      })
    }
    pegaId(id: number) {
      this.precaucoesService.getById(id).subscribe((precaucaosDis) => {
        if (precaucaosDis.ativo === true) {
          this.varConfirm = 'desativar';
        } else {
          this.varConfirm = 'ativar';
        }
        this.precaucaoAux = precaucaosDis;
      });
    }
    mudarStatus() {
      if (this.precaucaoAux.ativo === true) {
        this.precaucaoAux.ativo = false;
        this.precaucoesService.disable(this.precaucaoAux).subscribe(
          sucess => this.loadListaPrecaucoes()
        );
      } else {
        this.precaucaoAux.ativo = true;
        this.precaucoesService.disable(this.precaucaoAux).subscribe(
          sucess => this.loadListaPrecaucoes()
        );
      }
    }
  }
