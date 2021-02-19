import { Component, OnInit} from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fator } from '../model/fator';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DescricaoFatorComponent } from '../descricao-fator/descricao-fator.component';



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
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private fatoresService: FatorRiscoService, public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.msgError = null;
    this.loadListaFatores();
    CadastroFatorComponent.atualizando.subscribe(
      success => {
        this.loadListaFatores()
      }
    );
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
  limpar() {
    this.pesquisaForm.reset;
    this.mensagem = null;
    this.statusPesquisa = false;
    this.loadListaFatores();
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroFatorComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = "Cadastrar fator de risco";
    modalRef.componentInstance.formulario = this.formularioCadastro;
    this.loadListaFatores();
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroFatorComponent, this.MODALOPTIONS);
    if (this.formularioAtualizar != null) {
      modalRef.componentInstance.tituloModal = "Editar fator de risco";
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
    this.loadListaFatores();
  }
  editar(id: number) {
    this.fatoresService.getById(id).subscribe((fatores) => {
      this.updateForm(fatores);
      if (this.formularioAtualizar != null) {
        this.atualizar();
      }
    })
  }
  descricao(id: number) {
    this.fatoresService.getById(id).subscribe((fatores) => {
      const modalRef = this.modalService.open(DescricaoFatorComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = "Descrição do fator de risco";
      modalRef.componentInstance.fatorRisco = fatores;
      }
    )
  }
  refresh(){
    if(this.pesquisaForm.get('pesquisar').value===''){
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
        sucess => this.loadListaFatores()
      );
    } else {
      this.fatorAux.ativo = true;
      this.fatoresService.disable(this.fatorAux).subscribe(
        sucess => this.loadListaFatores());
      }
    }
    pesquisa() {
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
      if (this.statusPesquisa === false) {
        this.fatoresService.getAll()
        .subscribe(
          data => {
            this.lista = data;
          });
        } else {
          if (this.pesquisaForm.valid) {
            this.fatoresService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {

                this.lista = data;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              });
            } else{
              this.fatoresService.getByNome(this.pesquisaForm.get('')).subscribe(
                data =>  {
                  this.lista = data;
                  this.mensagem = "Nenhum registro foi encontrado.";
                })
              }
            }
          }
        }
