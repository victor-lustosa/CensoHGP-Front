import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Precaucao} from './../model/precaucao';
import {PrecaucaoService} from './../service/precaucao.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroPrecaucaoComponent } from '../cadastro-precaucao/cadastro-precaucao.component';
import { DescricaoPrecaucaoComponent } from '../descricao-precaucao/descricao-precaucao.component';
@Component({
  selector: 'app-lista-precaucoes',
  templateUrl: './lista-precaucoes.component.html',
  styleUrls: ['./lista-precaucoes.component.scss']
})
export class ListaPrecaucoesComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  pesquisaForm: FormGroup = null;
  lista: Precaucao[]=[];
  sucesso: boolean = false;
  pageSize = 10;
  page = 1;
  statusSpinner: boolean = false;
  precaucaoAux: Precaucao;
  varConfirm: string;
  statusPesquisa: boolean = false;
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private precaucoesService: PrecaucaoService,  public modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadListaPrecaucoes();
    CadastroPrecaucaoComponent.atualizando.subscribe(
      () => {
        this.loadListaPrecaucoes();
      })
      this.pesquisaForm = new FormGroup({
        pesquisar: new FormControl(null, Validators.required)
      });
    }
    public pesquisa(): void {
      this.statusPesquisa = true;
      this.loadListaPrecaucoes();
    }
    limpar() {
      this.pesquisaForm.reset;
      this.mensagem = null;
      this.statusPesquisa = false;
      this.loadListaPrecaucoes();
    }
    cadastrar(){
      const modalRef = this.modalService.open(CadastroPrecaucaoComponent, this.MODALOPTIONS)
      modalRef.componentInstance.formulario = this.formularioCadastro;
      modalRef.componentInstance.tituloModal = "Cadastrar precaução";
    }
    descricao(id: number) {
      this.precaucoesService.getById(id).subscribe((precaucao) => {
        const modalRef = this.modalService.open(DescricaoPrecaucaoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = "Descrição da precaução";
        modalRef.componentInstance.precaucao = precaucao;
      })
  }
  editar(id:number){
    this.precaucoesService.getById(id).subscribe((precaucao) => {
      const modalRef = this.modalService.open(CadastroPrecaucaoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = "Editar precaução";
        modalRef.componentInstance.precaucao = precaucao;
    })
  }
    refresh(){
    if(this.pesquisaForm.get('pesquisar').value === ''){
      this.mensagem = null;
      this.loadListaPrecaucoes();
    }
  }
  loadListaPrecaucoes() {
    this.lista = [];
    this.statusSpinner = true;
    if (this.statusPesquisa === false) {
      setTimeout(() => {
        this.precaucoesService.getAll().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );

      }, 400)
    } else {
      if (this.pesquisaForm.valid) {
        setTimeout(() => {
          this.precaucoesService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
              if (this.lista.length <= 0) {
                this.mensagem = "Nenhum registro foi encontrado.";
              } else {
                this.mensagem = null;
              }
              this.statusPesquisa = false;
            });

        }, 400)
      } else {
        setTimeout(() => {
          this.statusSpinner = false;
          this.mensagem = "Nenhum registro foi encontrado.";
        }, 100)
      }
    }
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
            () => this.loadListaPrecaucoes()
          );
        } else {
          this.precaucaoAux.ativo = true;
          this.precaucoesService.disable(this.precaucaoAux).subscribe(
            () => this.loadListaPrecaucoes()
          );
        }
      }
    }
