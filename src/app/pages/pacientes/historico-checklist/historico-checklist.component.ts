import { DescricaoHistoricoChecklistComponent } from './../descricao-historico-checklist/descricao-historico-checklist.component';
import { ChecklistDTO } from './../model/checklist.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historico-checklist',
  templateUrl: './historico-checklist.component.html',
  styleUrls: ['./historico-checklist.component.scss']
})
export class HistoricoChecklistComponent implements OnInit {
  searchText: string;
  paginaAtual: number = 1;
  contador: number = 10;
  checklists: any[] = [];
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
        this.checklists = data.checklists;
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
  }

  cadastrar() {
    this.router.navigate(['/pacientes/gerenciar-pacientes']);
  }

  descricao(checklist: ChecklistDTO) {
    const modalRef = this.modalService.open(DescricaoHistoricoChecklistComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Descrição do checklist';
    modalRef.componentInstance.checklist = checklist;
  }
}
