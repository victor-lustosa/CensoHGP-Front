
import { Component, OnInit } from '@angular/core';
import { IncidenteService } from '../service/incidente.service';
import { Incidente } from '../model/incidente';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroIncidenteComponent } from '../cadastro-incidente/cadastro-incidente.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DescricaoIncidenteComponent } from '../descricao-incidente/descricao-incidente.component';

@Component({
  selector: 'app-lista-incidentes',
  templateUrl: './lista-incidentes.component.html',
  styleUrls: ['./lista-incidentes.component.scss']
})
export class ListaIncidentesComponent implements OnInit {

  formularioAtualizar: FormGroup = null;
  pesquisaForm: FormGroup = null;
  lista: Incidente[] = [];
  statusSpinner: boolean = false;
  msgError: string;
  sucesso: boolean = false;
  pageSize = 10;
  page = 1;
  varConfirm: string;
  incidenteAux: Incidente;
  statusPesquisa: boolean = false;
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private incidentesService: IncidenteService, public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError = null;
    this.loadListaIncidentes();
    CadastroIncidenteComponent.atualizando.subscribe(
      () => {
        this.loadListaIncidentes();
      });


      this.pesquisaForm = new FormGroup({
        pesquisar: new FormControl(null, Validators.required)
      });
    }

    public pesquisa(): void {
      this.statusPesquisa = true;
      this.loadListaIncidentes();
    }
    limpar() {
      this.pesquisaForm.reset;
      this.mensagem = null;
      this.statusPesquisa = false;
      this.loadListaIncidentes();
    }
    cadastrar() {
      const modalRef = this.modalService.open(CadastroIncidenteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Cadastrar incidente";

    }
    atualizar() {
      const modalRef = this.modalService.open(CadastroIncidenteComponent, this.MODALOPTIONS);
      if (this.formularioAtualizar != null) {
        modalRef.componentInstance.tituloModal = "Editar incidente";
        modalRef.componentInstance.formulario = this.formularioAtualizar;
      }
      this.loadListaIncidentes();
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
  refresh(){
    if(this.pesquisaForm.get('pesquisar').value===''){
      this.mensagem = null;
      this.loadListaIncidentes();
    }
  }

  loadListaIncidentes() {
    this.lista = [];
    this.statusSpinner = true;
    if (this.statusPesquisa === false) {
      setTimeout(() => {
        this.incidentesService.getAll().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );

      }, 400)
    } else {
      if (this.pesquisaForm.valid) {
        setTimeout(() => {
          this.incidentesService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
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
