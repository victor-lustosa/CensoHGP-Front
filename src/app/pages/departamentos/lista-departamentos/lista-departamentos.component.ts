
import { Component, OnInit } from '@angular/core';
import { Departamento } from './../model/departamento';
import { DepartamentoService, TipoDepartamentoService} from './../service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
import { TipoDepartamento } from '../model/tipoDepartamento';
@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  ativoRadio: any[];
  tipoDepartamentoRadio: any[];
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  status: boolean;
  searchText:string;
  tipodepartamento:number;
  ativo:boolean;
  lista:Departamento[] = [];
  msgError: string;
  pageSize:number = 10;
  page:number = 1;
  departamentoAux: Departamento;
  varConfirm: string;
  pesquisaForm: FormGroup = null;
  ListaTipoDepartamento:TipoDepartamento[];
  departamentoAuxiliar: TipoDepartamento;
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
      this.searchText = '';
      return this.searchText;
    }
    cadastrar(){
      const modalRef =  this.modalService.open(CadastroDepartamentoComponent, { size: 'lg' });
      modalRef.componentInstance.formulario = this.formularioCadastro;
    }
    atualizar() {
      const modalRef = this.modalService.open(CadastroDepartamentoComponent, { size: 'lg' });
      if(this.formularioAtualizar != null){
        modalRef.componentInstance.formulario = this.formularioAtualizar;
      }
    }
    editar(id:number){
      this.departamentosService.getById(id).subscribe((departamentos) => {
        console.log(departamentos);
        this.updateForm(departamentos);
        console.log(this.formularioAtualizar)
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
          console.log(data);
        },
        error => {
          console.log('Erro serviço ' + error)
        })
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
            error => {
              console.log('Erro na mudança de status: ' + error);
            }
          );
        } else {
          this.departamentoAux.ativo = true;
          this.departamentosService.disable(this.departamentoAux).subscribe(
            error => {
              console.log('Erro na mudança de status: ' + error);
            });
        }
        location.reload();
    }
    }
