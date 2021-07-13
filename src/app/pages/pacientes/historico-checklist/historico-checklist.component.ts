import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs/operators';
import { Checklist } from '../model/Checklist';
import { PacienteService } from '../service';

@Component({
  selector: 'app-historico-checklist',
  templateUrl: './historico-checklist.component.html',
  styleUrls: ['./historico-checklist.component.scss']
})
export class HistoricoChecklistComponent implements OnInit {
  searchText: string;
  paginaAtual: number = 1;
  contador: number = 10;
  lista: Checklist[] = [];
  sucesso: boolean = false;
  statusSpinner: boolean = false;
  varConfirm: string;
  mensagem: string;
  ativo: number = 1;
  listaAtivo: any[];
auxiliar: number;


  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalService: NgbModal) { }
  ngOnInit(): void {

    this.loadListaChecklists();
    this.activatedRoute.params.pipe(
      map((params: any) =>  params['id']),
      switchMap(id =>  this.auxiliar= id)
    ).subscribe((data) => {
      console.log("chegou aquui" + this.auxiliar);
        this.statusSpinner = false;

    }
    );

  }
  verifica() {
    this.paginaAtual = 1;
  }
  limpar() {
    this.searchText = '';
  }
  filtroStatus(value: any) {
    this.ativo = value;
    this.loadListaChecklists();
  }

  // descricao(id: number) {
  //   this.precaucoesService.getById(id).subscribe((precaucao) => {
  //     const modalRef = this.modalService.open(DescricaoPrecaucaoComponent, this.MODALOPTIONS);
  //     modalRef.componentInstance.tituloModal = 'Descrição da precaução';
  //     modalRef.componentInstance.precaucao = precaucao;
  //   });
  // }

  voltar() {
    this.router.navigate(['/pacientes/gerenciar-pacientes']);
  }
  loadListaChecklists() {

    this.lista = [];
    this.statusSpinner = true;
    setTimeout(() => {
      this.activatedRoute.params.pipe(
        map((params: any) =>  params['id']),
        switchMap(id =>  this.pacienteService.getAllChecklistPaciente(id))
      ).subscribe((data) => {
        this.lista = data,
          this.statusSpinner = false;

      }
      );
    }, 400);
  }

  descricao(id: number){

 }
 cadastrar(){

}
}
