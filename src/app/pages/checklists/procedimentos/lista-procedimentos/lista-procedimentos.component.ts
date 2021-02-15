import { Component, OnInit } from '@angular/core';
import { ProcedimentoService } from '../service/procedimento.service';
import { Procedimento } from '../model/procedimento';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProcedimentoComponent } from '../cadastro-procedimento/cadastro-procedimento.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-lista-procedimentos',
  templateUrl: './lista-procedimentos.component.html',
  styleUrls: ['./lista-procedimentos.component.scss']
})
export class ListaProcedimentosComponent implements OnInit {
  formularioCadastro: FormGroup = null;
  formularioAtualizar: FormGroup = null;
  status: boolean;
  lista: Procedimento[] = [];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  pageSize = 10;
  page = 1;
  varConfirm: string;
  procedimentoAux: Procedimento;
  pesquisaForm: FormGroup = null;
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private procedimentosService: ProcedimentoService, public modalService: NgbModal, private formBuilder: FormBuilder, location: Location) { }

  ngOnInit(): void {
    this.msgError = null;
    this.loadListaProcedimentos();
    CadastroProcedimentoComponent.atualizando.subscribe(
      success => {
        if(success == true){
        this.procedimentosService.getAll()
        .subscribe(
          data => {
            this.lista = data;
            console.log(this.lista)
          });
        }
      }
    );
    this.formularioCadastro = this.formBuilder.group({
      idProcedimento: [null],
      nome: [null, [ Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: ['true']
    })
    this.formularioAtualizar = this.formBuilder.group({
      idProcedimento: [null],
      nome: [null, [ Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: ['true']
    })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  public pesquisa(): void {

  }
  limpar() {

  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroProcedimentoComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = "Cadastrar procedimento";
    modalRef.componentInstance.formulario = this.formularioCadastro;
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroProcedimentoComponent, this.MODALOPTIONS);
    if (this.formularioAtualizar != null) {
      modalRef.componentInstance.tituloModal = "Editar procedimento";
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
  }
  editar(id: number) {
    this.procedimentosService.getById(id).subscribe(
      (procedimentos) => {
        this.updateForm(procedimentos);
        if (this.formularioAtualizar != null) {
          this.atualizar();
        }
      })
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
          sucess => this.loadListaProcedimentos()
        );
      } else {
        this.procedimentoAux.ativo = true;
        this.procedimentosService.disable(this.procedimentoAux).subscribe(
          sucess => this.loadListaProcedimentos()
        );
      }
    }
    updateForm(procedimentos: Procedimento) {
      this.formularioAtualizar.patchValue({
        idProcedimento: procedimentos.idProcedimento,
        nome: procedimentos.nome,
        descricao: procedimentos.descricao,
        ativo: procedimentos.ativo
      })
    }
    loadListaProcedimentos() {
      this.procedimentosService.getAll()
      .subscribe(
        data => {
          this.lista = data;
        });
      }
    }
