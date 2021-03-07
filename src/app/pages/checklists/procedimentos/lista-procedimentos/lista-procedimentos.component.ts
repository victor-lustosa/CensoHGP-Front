import { Component, OnInit } from '@angular/core';
import { ProcedimentoService } from '../service/procedimento.service';
import { Procedimento } from '../model/procedimento';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProcedimentoComponent } from '../cadastro-procedimento/cadastro-procedimento.component';
import { Location } from '@angular/common';
import { DescricaoProcedimentoComponent } from '../descricao-procedimento/descricao-procedimento.component';
@Component({
  selector: 'app-lista-procedimentos',
  templateUrl: './lista-procedimentos.component.html',
  styleUrls: ['./lista-procedimentos.component.scss']
})
export class ListaProcedimentosComponent implements OnInit {
  searchText: string;
  paginaAtual : number = 1 ;
  contador : number = 10;
  lista: Procedimento[] = [];
  sucesso: boolean = false;
  statusPesquisa: boolean = false;
  statusSpinner: boolean = false;
  varConfirm: string;
  procedimentoAux: Procedimento;
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private procedimentosService: ProcedimentoService, public modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.loadListaProcedimentos();
    CadastroProcedimentoComponent.atualizando.subscribe(
      () => {
        this.loadListaProcedimentos();
      });
    }
    limpar() {
      this.searchText ='';
    }
    verifica(){
        this.paginaAtual = 1;
    }
    cadastrar() {
      const modalRef = this.modalService.open(CadastroProcedimentoComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Cadastrar procedimento";
    }
    descricao(id: number) {
      this.procedimentosService.getById(id).subscribe((procedimento) => {
        const modalRef = this.modalService.open(DescricaoProcedimentoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = "Descrição do procedimento";
        modalRef.componentInstance.procedimento = procedimento;
      }
    )
  }
  editar(id: number) {
    this.procedimentosService.getById(id).subscribe((procedimento) => {
      const modalRef = this.modalService.open(CadastroProcedimentoComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Editar procedimento";
      modalRef.componentInstance.procedimento = procedimento;
    }
  )
    }
    pegaId(id: number) {
      this.procedimentosService.getById(id).subscribe((procedimentosDis) => {
        if (procedimentosDis.ativo === true) {
          this.varConfirm = 'desativar';
        } else {
          this.varConfirm = 'ativar';
        }
        this.procedimentoAux = procedimentosDis;
      });
    }
    mudarStatus() {
      if (this.procedimentoAux.ativo === true) {
        this.procedimentoAux.ativo = false;
        this.procedimentosService.disable(this.procedimentoAux).subscribe(
          () => this.loadListaProcedimentos()
        );
      } else {
        this.procedimentoAux.ativo = true;
        this.procedimentosService.disable(this.procedimentoAux).subscribe(
          () => this.loadListaProcedimentos()
        );
      }
    }
    loadListaProcedimentos() {
      this.lista = [];
      this.statusSpinner = true;
      if (this.statusPesquisa === false) {
        setTimeout(()=>{
          this.procedimentosService.getAll().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          );

        },400)
       }
      }
    }
