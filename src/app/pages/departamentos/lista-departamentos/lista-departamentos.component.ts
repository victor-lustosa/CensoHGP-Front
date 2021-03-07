import { Component, OnInit } from '@angular/core';
import { Departamento } from './../model/departamento';
import { DepartamentoService } from './../service'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import { DescricaoDepartamentoComponent } from '../descricao-departamento/descricao-departamento.component';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  lista: Departamento[] = [];
  paginaAtual : number = 1 ;
  contador : number = 10;
  ativo: number = 1;
  searchText: string;
  statusSpinner: boolean = false;
  tipoDepartamento: number = 1;
  departamentoAux: Departamento;
  varConfirm: string;
  listaAtivo: any[];
  listaTipoDepartamento: any[];
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private departamentosService: DepartamentoService,
    public modalService: NgbModal) { }
    ngOnInit(): void {
      this.loadListaDepartamentos();
      this.listaAtivo = this.departamentosService.getStatusDepartamentos();
      this.listaTipoDepartamento = this.departamentosService.getFiltroTipoDepartamentos();
      CadastroDepartamentoComponent.atualizando.subscribe(
        () => {
          this.loadListaDepartamentos();
        })
      }
      limpar() {
        this.searchText ='';
      }
      verifica(){
          this.paginaAtual = 1;
      }
      cadastrar() {
        const modalRef = this.modalService.open(CadastroDepartamentoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = 'Cadastrar departamento';
      }
      editar(id: number) {
        this.departamentosService.getById(id).subscribe((departamento) => {
          const modalRef = this.modalService.open(CadastroDepartamentoComponent, this.MODALOPTIONS);
          modalRef.componentInstance.tituloModal = 'Editar departamento';
          modalRef.componentInstance.departamento = departamento;
        }
      )
    }
    descricao(id: number) {
      this.departamentosService.getById(id).subscribe((departamento) => {
        const modalRef = this.modalService.open(DescricaoDepartamentoComponent, this.MODALOPTIONS);
        modalRef.componentInstance.tituloModal = 'Descrição do departamento';
        modalRef.componentInstance.departamento = departamento;
      }
    )
  }
  filtroStatus(value: any) {
    this.ativo = value;
    this.loadListaDepartamentos();
  }
  filtroTipoDepartamento(value: any) {
    this.tipoDepartamento = value;
    this.loadListaDepartamentos();
  }
  loadListaDepartamentos() {
    this.statusSpinner = true;
      if (this.ativo == 2 && this.tipoDepartamento == 2) {
        setTimeout(() => {
          this.departamentosService.getAllAtivosInternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.ativo == 2 && this.tipoDepartamento == 3) {
        setTimeout(() => {
          this.departamentosService.getAllAtivosExternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.ativo == 3 && this.tipoDepartamento == 2) {
        setTimeout(() => {
          this.departamentosService.getAllInativosInternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.ativo == 3 && this.tipoDepartamento == 3) {
        setTimeout(() => {
          this.departamentosService.getAllInativosExternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.tipoDepartamento == 2) {
        setTimeout(() => {
          this.departamentosService.getAllInternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.tipoDepartamento == 3) {
        setTimeout(() => {
          this.departamentosService.getAllExternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.ativo == 2) {
        setTimeout(() => {
          this.departamentosService.getAllAtivos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.ativo == 3) {
        setTimeout(() => {
          this.departamentosService.getAllInativos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else if (this.ativo == 3 && this.tipoDepartamento == 2) {
        setTimeout(() => {
          this.departamentosService.getAllInativosInternos().subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          )
        } , 400)
      }
      else {
        setTimeout(() => {
          this.departamentosService.getAll()
          .subscribe(
            data => {
              this.lista = data;
              this.statusSpinner = false;
            }
          );
        }, 400)
      }
  }
  pegaId(id: number) {
    this.departamentosService.getById(id).subscribe((departamentosDis) => {
      if (departamentosDis.ativo === true) {
        this.varConfirm = 'desativar';
      } else {
        this.varConfirm = 'ativar';
      }
      this.departamentoAux = departamentosDis;
    });
  }
  mudarStatus() {
    if (this.departamentoAux.ativo === true) {
      this.departamentoAux.ativo = false;
      this.departamentosService.disable(this.departamentoAux).subscribe(
        () => this.loadListaDepartamentos()
      );
    } else {
      this.departamentoAux.ativo = true;
      this.departamentosService.disable(this.departamentoAux).subscribe(
        () => this.loadListaDepartamentos()
      );
    }
  }
}
