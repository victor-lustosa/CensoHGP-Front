import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Transferencia } from '../model/transferencia';
import { DescricaoHistoricoTransferenciaComponent } from '../descricao-historico-transferencia/descricao-historico-transferencia.component';
@Component({
  selector: 'app-historico-transferencia',
  templateUrl: './historico-transferencia.component.html',
  styleUrls: ['./historico-transferencia.component.scss']
})
export class HistoricoTransferenciaComponent implements OnInit {
  searchText: string;
  paginaAtual: number = 1;
  contador: number = 10;
  transferencias: any[] = [];
  sucesso: boolean = false;
  statusSpinner: boolean = false;
  varConfirm: string;
  mensagem: string;
  ativo: number = 1;
  listaAtivo: any[];
  id: number;
  auxiliar: number;

  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
      this.statusSpinner = true;
      setTimeout(() => {
  this.activatedRoute.data.subscribe((data: any) => {
        this.transferencias = data.transferencias;
        this.statusSpinner = false;
    });}, 400);
  }

  verifica() {
    this.paginaAtual = 1;
  }

  limpar() {
    this.searchText = '';
  }

  filtroStatus(value: any) {
    this.ativo = value;
    // this.loadListaChecklists();
  }

  cadastrar() {
    this.router.navigate(['/pacientes/gerenciar-pacientes']);
  }

  descricao(transferencia: Transferencia) {
    const modalRef = this.modalService.open(DescricaoHistoricoTransferenciaComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Descrição de transferência';
    modalRef.componentInstance.transferencia = transferencia;
  }
}
