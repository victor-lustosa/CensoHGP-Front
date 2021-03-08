
import { Component, OnInit } from '@angular/core';
import { IncidenteService } from '../service/incidente.service';
import { Incidente } from '../model/incidente';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroIncidenteComponent } from '../cadastro-incidente/cadastro-incidente.component';
import { DescricaoIncidenteComponent } from '../descricao-incidente/descricao-incidente.component';

@Component({
  selector: 'app-lista-incidentes',
  templateUrl: './lista-incidentes.component.html',
  styleUrls: ['./lista-incidentes.component.scss']
})
export class ListaIncidentesComponent implements OnInit {
  lista: Incidente[] = [];
  searchText: string;
  statusSpinner: boolean = false;
  paginaAtual : number = 1 ;
  contador : number = 10;
  sucesso: boolean = false;
  varConfirm: string;
  incidenteAux: Incidente;
  mensagem: string;
  ativo: number = 1;
  listaAtivo: any[];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private incidentesService: IncidenteService, public modalService: NgbModal) { }
  ngOnInit(): void {
    this.loadListaIncidentes();
    this.listaAtivo = this.incidentesService.getStatusIncidentes();
    CadastroIncidenteComponent.atualizando.subscribe(
      () => {
        this.loadListaIncidentes();
      });
    }
    verifica(){
      this.paginaAtual = 1;
    }
    limpar() {
      this.searchText ='';
    }
    filtroStatus(value: any) {
      this.ativo = value;
      this.loadListaIncidentes();
    }
    cadastrar() {
      const modalRef = this.modalService.open(CadastroIncidenteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Cadastrar incidente";
    }
    descricao(id: number) {
      this.incidentesService.getById(id).subscribe((incidente) => {
        const modalRef = this.modalService.open(DescricaoIncidenteComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = "Descrição do incidente";
        modalRef.componentInstance.incidente = incidente;
      }
    )
  }
  editar(id: number) {
    this.incidentesService.getById(id).subscribe((incidentes) => {
      const modalRef = this.modalService.open(CadastroIncidenteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Editar incidente";
      modalRef.componentInstance.incidente = incidentes;
    }
  )
}
loadListaIncidentes() {
  this.lista =  [];
  this.statusSpinner = true;
  if (this.ativo == 2) {
    setTimeout(() => {
      this.incidentesService.getAllAtivos().subscribe(
        data => {
          this.lista = data;
          this.statusSpinner = false;
        }
      )
    } , 400)
  }
  else if (this.ativo == 3) {
    setTimeout(() => {
      this.incidentesService.getAllInativos().subscribe(
        data => {
          this.lista = data;
          this.statusSpinner = false;
        }
      )
    } , 400)
  }
  else {
    setTimeout(() => {
      this.incidentesService.getAll().subscribe(
        data => {
          this.lista = data;
          this.statusSpinner = false;
        }
      );
    }, 400)
  }
}
pegaId(id: number) {
  this.incidentesService.getById(id).subscribe((incidentesDis) => {
    if (incidentesDis.ativo === true) {
      this.varConfirm = 'desativar';
    } else {
      this.varConfirm = 'ativar';
    }
    this.incidenteAux = incidentesDis;
  });
}
mudarStatus() {
  if (this.incidenteAux.ativo === true) {
    this.incidenteAux.ativo = false;
    this.incidentesService.disable(this.incidenteAux).subscribe(
      () => this.loadListaIncidentes()
    );
  } else {
    this.incidenteAux.ativo = true;
    this.incidentesService.disable(this.incidenteAux).subscribe(
      () => this.loadListaIncidentes()
    );
  }
}
}
