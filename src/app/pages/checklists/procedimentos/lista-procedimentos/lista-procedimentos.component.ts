import { Component, OnInit } from '@angular/core';
import { ProcedimentoService } from '../service/procedimento.service';
import { Procedimento } from '../model/procedimento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProcedimentoComponent } from '../cadastro-procedimento/cadastro-procedimento.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-procedimentos',
  templateUrl: './lista-procedimentos.component.html',
  styleUrls: ['./lista-procedimentos.component.scss']
})
export class ListaProcedimentosComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  idFator:number = 0;
  status: boolean;
  lista: Procedimento[] = [];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  pageSize = 10;
  page = 1;
  constructor(private procedimentosService: ProcedimentoService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaProcedimentos();
    this.formularioCadastro = this.formBuilder.group({
      idProcedimento: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idProcedimento: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
  }
  limpar(){
      this.searchText = '';
      return this.searchText;
  }
  cadastrar(){
    const modalRef =  this.modalService.open(CadastroProcedimentoComponent, { size: 'lg' });
    modalRef.componentInstance.formulario = this.formularioCadastro;
    this.loadListaProcedimentos();
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroProcedimentoComponent, { size: 'lg' });
    if(this.formularioAtualizar != null){
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
    this.loadListaProcedimentos();
  }
  editar(id:number){
    this.procedimentosService.getById(id).subscribe((procedimentos) => {
      console.log(procedimentos);
      this.updateForm(procedimentos);
      console.log(this.formularioAtualizar)
      if(this.formularioAtualizar != null){
        this.atualizar();
      }
    })
  }
  updateForm(procedimentos: Procedimento){

    this.formularioAtualizar.patchValue({
      idProcedimento: procedimentos.idProcedimento,
      nome:procedimentos.nome,
      descricao: procedimentos.descricao
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
        console.log('Erro serviço ' + error)
      })
    }
  }
