import { Component, OnInit } from '@angular/core';
import { Departamento } from './../model/departamento';
import { DepartamentoService, TipoDepartamentoService} from './../service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import { TipoDepartamento } from '../model/tipoDepartamento';
@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  lista:Departamento[] = [];
  msgError: string;
  pageSize:number = 10;
  page:number = 1;
  departamentoAux: Departamento;
  varConfirm: string;
  pesquisaForm: FormGroup = null;
  listaAtivo:any[];
  listaTipoDepartamento:TipoDepartamento[];
  departamentoAuxiliar: TipoDepartamento;
  MODALOPTIONS: NgbModalOptions = {keyboard : true, size : 'lg', backdrop : 'static'};
  constructor(private departamentosService: DepartamentoService,
    public modalService: NgbModal, private formBuilder: FormBuilder,
    private tipoDepartamentoService: TipoDepartamentoService) { }

    ngOnInit(): void {
      this.msgError= null;
      this.loadListaDepartamentos();
      this.formularioCadastro = this.formBuilder.group({
        idDepartamento: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        numero_leitos: [null, [Validators.required]],
        ativo: [true],
        tipodepartamento:[null],
        descricao:[null]
      })

      this.formularioAtualizar = this.formBuilder.group({
        idDepartamento: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        numero_leitos: [null, [Validators.required]],
        ativo: [true],
        tipodepartamento:[null],
        descricao:[null],
      })
      this.pesquisaForm = new FormGroup({
        pesquisar: new FormControl(null, Validators.required)
      });
    }
    pesquisa(){}
    limpar(){

    }
    cadastrar(){
      const modalRef =  this.modalService.open(CadastroDepartamentoComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Cadastrar departamento';
      modalRef.componentInstance.formulario = this.formularioCadastro;

    }
    atualizar() {
      const modalRef = this.modalService.open(CadastroDepartamentoComponent, this.MODALOPTIONS);
      if(this.formularioAtualizar != null){
        modalRef.componentInstance.tituloModal = 'Editar departamento';
        modalRef.componentInstance.formulario = this.formularioAtualizar;
      }
    }
    editar(id:number){
      this.departamentosService.getById(id).subscribe((departamentos) => {
        this.updateForm(departamentos);
        if(this.formularioAtualizar != null){
          this.atualizar();
        }
      })
    }
    updateForm(departamentos: Departamento){
      this.tipoDepartamentoService.getById(departamentos.tipodepartamento.idTipoDepartamento).subscribe(
        data => {
          this.departamentoAuxiliar = data;
          console.log("esse é o departamento aux" , this.departamentoAuxiliar )
        }
      )
      this.formularioAtualizar.patchValue({
        idDepartamento: departamentos.idDepartamento,
        nome:departamentos.nome,
        numero_leitos: departamentos.numero_leitos,
        ativo: departamentos.ativo,
        tipodepartamento: this.departamentoAuxiliar,
        descricao: departamentos.descricao
      })
    }
    loadListaDepartamentos() {
      this.departamentosService.getAll()
      .subscribe(
        data => {
          this.lista = data;
        })
      }
      pegaId(id: number) {
        this.departamentosService.getById(id).subscribe((departamentosDis) => {
          console.log('departamentodis', departamentosDis);
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
            sucess => this.loadListaDepartamentos()
          );
        } else {
          this.departamentoAux.ativo = true;
          this.departamentosService.disable(this.departamentoAux).subscribe(
            sucess => this.loadListaDepartamentos()
          );
        }
      }
    }
