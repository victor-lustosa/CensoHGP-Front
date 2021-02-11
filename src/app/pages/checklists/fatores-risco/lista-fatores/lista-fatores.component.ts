import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fator } from '../model/fator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  formularioCadastro: FormGroup = null;
  formularioAtualizar: FormGroup = null;
  status: boolean;
  lista: Fator[] = [];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  pageSize = 20;
  page = 1;
  varConfirm: string;
  fatorAux: Fator;

  constructor(private fatoresService: FatorRiscoService, public modalService: NgbModal, private formBuilder: FormBuilder, location: Location) { }

  ngOnInit(): void {
    this.msgError = null;
    this.loadListaFatores();
    this.formularioCadastro = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
  }
  limpar() {
    this.searchText = '';
    return this.searchText;
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroFatorComponent, { size: 'lg' });
    modalRef.componentInstance.tituloModal = "Cadastrar fator de risco";
    modalRef.componentInstance.formulario = this.formularioCadastro;
    this.loadListaFatores();
  }

  atualizar() {
    const modalRef = this.modalService.open(CadastroFatorComponent, { size: 'lg' });
    if (this.formularioAtualizar != null) {
      modalRef.componentInstance.tituloModal = "Editar fator de risco";
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
    this.loadListaFatores();
  }
  editar(id: number) {
    this.fatoresService.getById(id).subscribe((fatores) => {
      console.log(fatores);
      this.updateForm(fatores);
      console.log(this.formularioAtualizar)
      if (this.formularioAtualizar != null) {
        this.atualizar();
      }
    })
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
        error => {
          console.log('Erro na mudança de status: ' + error);
        }
      );
    } else {
      this.fatorAux.ativo = true;
      this.fatoresService.disable(this.fatorAux).subscribe(
        error => {
          console.log('Erro na mudança de status: ' + error);
        });
    }
    location.reload();

  }


  updateForm(fatores: Fator) {

    this.formularioAtualizar.patchValue({
      idFatorRisco: fatores.idFatorRisco,
      nome: fatores.nome,
      descricao: fatores.descricao,
      ativo: fatores.ativo
    })
  }
  loadListaFatores() {
    this.fatoresService.getAll()
      .subscribe(
        data => {
          this.lista = data;
          console.log(data);
        },
        error => {
          console.log('Erro serviço ' + error);
        });
  }
}
