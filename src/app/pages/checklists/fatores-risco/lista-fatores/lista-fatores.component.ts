import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fator } from '../model/fator';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { DescricaoFatorComponent } from '../descricao-fator/descricao-fator.component';

@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  searchText: string;
  paginaAtual: number = 1 ;
  contador: number = 10;
  statusSpinner: boolean = false;
  lista: Fator[] = [];
  sucesso: boolean = false;
  varConfirm: string;
  fatorAux: Fator;
  mensagem: string;
  ativo: number = 1;
  listaAtivo: any[];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private fatoresService: FatorRiscoService, public modalService: NgbModal) { }
  ngOnInit(): void {
    this.loadListaFatores();
    this.listaAtivo = this.fatoresService.getStatusFatores();
    CadastroFatorComponent.atualizando.subscribe(
      () => {
        this.loadListaFatores();
      }
    );
  }
  filtroStatus(value: any) {
    this.ativo = value;
    this.loadListaFatores();
  }
  verifica(){
    this.paginaAtual = 1;
  }
  limpar() {
    this.searchText = '';
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroFatorComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Cadastrar fator de risco';
  }
  descricao(fator: Fator) {
      const modalRef = this.modalService.open(DescricaoFatorComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Descrição do fator de risco';
      modalRef.componentInstance.fatorRisco = fator;
}
editar(fator: Fator) {
    const modalRef = this.modalService.open(CadastroFatorComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Editar fator de risco';
    modalRef.componentInstance.fatorRisco = fator;
}
pegaId(fator: Fator) {
    if (fator.ativo === true) {
      this.varConfirm = 'desativar';
    } else {
      this.varConfirm = 'ativar';
    }
    this.fatorAux = fator;
}
mudarStatus() {
  if (this.fatorAux.ativo === true) {
    this.fatorAux.ativo = false;
    this.fatoresService.disable(this.fatorAux).subscribe(
      () => this.loadListaFatores()
    );
  } else {
    this.fatorAux.ativo = true;
    this.fatoresService.disable(this.fatorAux).subscribe(
      () => this.loadListaFatores());
    }
  }
  loadListaFatores() {
    this.lista =  [];
    this.paginaAtual = 1;
    this.statusSpinner = true;
    if (this.ativo == 2) {
      setTimeout(() => {
          this.lista = [];
        this.fatoresService.getAllAtivos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else if (this.ativo == 3) {
      setTimeout(() => {
        this.lista = [];
        this.fatoresService.getAllInativos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
    else {
      setTimeout(() => {
          this.lista = [];
        this.fatoresService.getAll().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );
      }, 400);
    }
  }
}
