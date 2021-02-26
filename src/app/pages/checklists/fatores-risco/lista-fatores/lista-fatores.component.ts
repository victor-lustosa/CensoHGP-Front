import { Component, EventEmitter, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fator } from '../model/fator';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DescricaoFatorComponent } from '../descricao-fator/descricao-fator.component';

@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  static editar = new EventEmitter<boolean>();
  formularioCadastro: FormGroup = null;
  pesquisaForm: FormGroup = null;
  statusSpinner: boolean = false;
  status: boolean;
  lista: Fator[] = [];
  msgError: string;
  sucesso: boolean = false;
  pageSize = 10;
  page = 1;
  varConfirm: string;
  fatorAux: Fator;
  statusPesquisa: boolean = false;
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private fatoresService: FatorRiscoService, public modalService: NgbModal) { }
  ngOnInit(): void {
    this.msgError = null;
    this.loadListaFatores();
    CadastroFatorComponent.atualizando.subscribe(
      () => {
        this.loadListaFatores()
      }
    );
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  limpar() {
    this.pesquisaForm.reset;
    this.mensagem = null;
    this.statusPesquisa = false;
    this.loadListaFatores();
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroFatorComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = "Cadastrar fator de risco";
  }
  descricao(id: number) {
    this.fatoresService.getById(id).subscribe((fatores) => {
      const modalRef = this.modalService.open(DescricaoFatorComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Descrição do fator de risco";
      modalRef.componentInstance.fatorRisco = fatores;
    }
  )
}
editar(id: number) {
  this.fatoresService.getById(id).subscribe((fatores) => {
    const modalRef = this.modalService.open(CadastroFatorComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = "Editar fator de risco";
    modalRef.componentInstance.fatorRisco = fatores;
  }
)
}
refresh() {
  if (this.pesquisaForm.get('pesquisar').value === '') {
    this.mensagem = null;
    this.loadListaFatores();
  }
}
pegaId(id: number) {
  this.fatoresService.getById(id).subscribe((fatoresDis) => {
    if (fatoresDis.ativo === true) {
      this.varConfirm = 'desativar';
    } else {
      this.varConfirm = 'ativar';
    }
    this.fatorAux = fatoresDis;
  });
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
  pesquisa() {
    this.statusPesquisa = true;
    this.loadListaFatores();
  }
  loadListaFatores() {
    this.lista = [];
    this.statusSpinner = true;
    if (this.statusPesquisa === false) {
      setTimeout(() => {
        this.fatoresService.getAll().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          }
        );

      }, 400)
    } else {
      if (this.pesquisaForm.valid) {
        setTimeout(() => {
          this.fatoresService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
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
  }
