import { Component, OnInit } from '@angular/core';
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
  paginaAtual: number = 1 ;
  searchText: string;
  contador: number = 10;
  lista: Precaucao[] = [];
  sucesso: boolean = false;
  statusSpinner: boolean = false;
  precaucaoAux: Precaucao;
  varConfirm: string;
  mensagem: string;
  ativo: number = 1;
  listaAtivo: any[];
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private precaucoesService: PrecaucaoService,  public modalService: NgbModal) { }
  ngOnInit(): void {
    this.loadListaPrecaucoes();
    CadastroPrecaucaoComponent.atualizando.subscribe(
      () => {
        this.loadListaPrecaucoes();
      });
    }
    verifica(){
      this.paginaAtual = 1;
    }
    limpar() {
      this.searchText = '';
    }
    filtroStatus(value: any) {
      this.ativo = value;
      this.loadListaPrecaucoes();
    }
    cadastrar(){
      const modalRef = this.modalService.open(CadastroPrecaucaoComponent, this.MODALOPTIONS)
      modalRef.componentInstance.tituloModal = 'Cadastrar precaução';
    }
    descricao(id: number) {
      this.precaucoesService.getById(id).subscribe((precaucao) => {
        const modalRef = this.modalService.open(DescricaoPrecaucaoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = 'Descrição da precaução';
        modalRef.componentInstance.precaucao = precaucao;
      });
    }
    editar(id: number){
      this.precaucoesService.getById(id).subscribe((precaucao) => {
        const modalRef = this.modalService.open(CadastroPrecaucaoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = 'Editar precaução';
        modalRef.componentInstance.precaucao = precaucao;
      });
    }
    loadListaPrecaucoes() {
      this.lista =  [];
      this.statusSpinner = true;
      if (this.ativo == 2) {
        setTimeout(() => {
          this.precaucoesService.getAllAtivos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          );
        } , 400);
      }
      else if (this.ativo == 3) {
        setTimeout(() => {
          this.precaucoesService.getAllInativos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          );
        } , 400);
      }
      else {
        setTimeout(() => {
          this.precaucoesService.getAll().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          );
        }, 400);
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
