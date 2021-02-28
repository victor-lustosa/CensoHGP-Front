import { Component, OnInit } from '@angular/core';
import { Departamento } from './../model/departamento';
import { DepartamentoService } from './../service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import { DescricaoDepartamentoComponent } from '../descricao-departamento/descricao-departamento.component';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  formularioCadastro: FormGroup = null;
  formularioAtualizar: FormGroup = null;
  pesquisaForm: FormGroup = null;
  lista: Departamento[] = [];
  statusPesquisa: boolean = false;
  pageSize: number = 10;
  page: number = 1;
  ativo: number = 1;
  statusSpinner: boolean = false;
  tipoDepartamento: number = 1;
  departamentoAux: Departamento;
  varConfirm: string;
  listaAtivo: any[];
  listaTipoDepartamento: any[];

  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private departamentosService: DepartamentoService,
    public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadListaDepartamentos();
    this.listaAtivo = this.departamentosService.getStatusDepartamentos();
    this.listaTipoDepartamento = this.departamentosService.getFiltroTipoDepartamentos();
    CadastroDepartamentoComponent.atualizando.subscribe(
      () => {
        this.loadListaDepartamentos();
      })

    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }

  public pesquisa(): void {
    this.statusPesquisa = true;
    this.loadListaDepartamentos();
  }
  refresh() {
    if (this.pesquisaForm.get('pesquisar').value === '') {
      this.mensagem = null;
      this.loadListaDepartamentos();

    }

  }
  limpar() {

    this.pesquisaForm.reset();
    console.log(this.pesquisaForm.get('pesquisar').value);
    this.mensagem = null;
    this.statusPesquisa = false;
    this.loadListaDepartamentos();

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
  loadListaDepartamentos(value?: string) {
    this.lista = [];
    this.statusSpinner = true;
    if (this.statusPesquisa === false) {
      if (this.ativo == 2 && this.tipoDepartamento == 2) {
        setTimeout(() => {
        this.departamentosService.getAllAtivosInternos().subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
            if (this.lista.length <= 0) {
              this.mensagem = "Nenhum registro foi encontrado.";
            } else {
              this.mensagem = null;
            }
            this.statusPesquisa = false;
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
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
              );
        }, 400)
      }
    } else {
      if (this.pesquisaForm.valid) {
        console.log(this.pesquisaForm.value);
        if(this.ativo == 1 && this.tipoDepartamento == 2 ){
          setTimeout(() => {
            this.departamentosService.getByNomeInternos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else if(this.ativo == 2 && this.tipoDepartamento == 1){
          setTimeout(() => {
            this.departamentosService.getByNomeAtivos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else if(this.ativo == 2 && this.tipoDepartamento == 2){
          setTimeout(() => {
            this.departamentosService.getByNomeAtivosInternos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else if(this.ativo == 2 && this.tipoDepartamento == 3){
          setTimeout(() => {
            this.departamentosService.getByNomeAtivosExternos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else if(this.ativo == 3 && this.tipoDepartamento == 1){
          setTimeout(() => {
            this.departamentosService.getByNomeInativos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else if(this.ativo == 3 && this.tipoDepartamento == 2){
          setTimeout(() => {
            this.departamentosService.getByNomeInativosInternos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else if(this.ativo == 3 && this.tipoDepartamento == 3){
          setTimeout(() => {
            this.departamentosService.getByNomeInativosExternos(this.pesquisaForm.get('pesquisar').value).subscribe(
              data => {
                this.lista = data;
                this.statusSpinner = false;
                if (this.lista.length <= 0) {
                  this.mensagem = "Nenhum registro foi encontrado.";
                } else {
                  this.mensagem = null;
                }
                this.statusPesquisa = false;
              }
            )
            } , 400)
        }
        else{
        this.departamentosService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
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
      }} else {
        this.departamentosService.getByNome(this.pesquisaForm.get('')).subscribe(
          () => {
            this.statusPesquisa = false;
            this.departamentosService.getAll()
              .subscribe(
                data => {
                  this.lista = data;
                  this.statusSpinner = false;
                  if (this.lista.length <= 0) {
                    this.mensagem = "Nenhum registro foi encontrado.";
                  } else {
                    this.mensagem = null;
                  }
                  this.statusPesquisa = false;
                }
                );

          }
        )
      }
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
