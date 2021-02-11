import { Component, OnInit } from '@angular/core';
import { ProcedimentoService } from '../service/procedimento.service';
import { Procedimento } from '../model/procedimento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProcedimentoComponent } from '../cadastro-procedimento/cadastro-procedimento.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
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
  constructor(private procedimentosService: ProcedimentoService, public modalService: NgbModal, private formBuilder: FormBuilder, location: Location) { }

  ngOnInit(): void {
    this.msgError = null;
    this.loadListaProcedimentos();
    this.formularioCadastro = this.formBuilder.group({
      idProcedimento: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idProcedimento: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  public pesquisa(): void {
   // this.procedimentosService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
   //   (sucesso) => {
   //     console.log(sucesso);
   //     this.loadListaProcedimentos();
   //   },
   //   error => {
   //     this.msgError = error;
   //     console.log("error deleteFuncionario ListaFuncionarioComponent : " + error);
   //   });
 }
  limpar() {
    this.searchText = '';
    return this.searchText;
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroProcedimentoComponent, { size: 'lg' });
    modalRef.componentInstance.formulario = this.formularioCadastro;
    this.loadListaProcedimentos();
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroProcedimentoComponent, { size: 'lg' });
    if (this.formularioAtualizar != null) {
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
    this.loadListaProcedimentos();
  }
  editar(id: number) {
    this.procedimentosService.getById(id).subscribe((procedimentos) => {
      console.log(procedimentos);
      this.updateForm(procedimentos);
      console.log(this.formularioAtualizar)
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
        error => {
          console.log('Erro na mudança de status: ' + error);
        }
      );
    } else {
      this.procedimentoAux.ativo = true;
      this.procedimentosService.disable(this.procedimentoAux).subscribe(
        error => {
          console.log('Erro na mudança de status: ' + error);
        });
    }
    location.reload();

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
          console.log(data);
        },
        error => {
          console.log('Erro serviço ' + error);
        });
  }
}
