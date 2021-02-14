import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fator } from '../model/fator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  pageSize = 10;
  page = 1;
  varConfirm: string;
  fatorAux: Fator;
  pesquisaForm: FormGroup = null;
  statusPesquisa: boolean = false;
  mensagem: string;
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
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  limpar(){
    this.pesquisaForm.reset;
    this.mensagem = null;
    this.statusPesquisa = false;
    this.loadListaFatores();
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
    pesquisa(){
      this.statusPesquisa = true;
      this.loadListaFatores();
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
      if(this.statusPesquisa === false){
        this.fatoresService.getAll()
        .subscribe(
          data => {
            this.lista = data;
            console.log(data);
          },
          error => {
            console.log('Erro serviço ' + error);
          });
        }else {
          this.fatoresService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
            data => {
              this.lista = data;
              console.log(data);
              if( this.lista.length <= 0 ){
                this.mensagem = "Nenhum registro foi encontrado.";
              }else{
                this.mensagem = null;
              }
            },
            error => {
              console.log('Erro serviço ' + error)
            });
          }
        }
      }
