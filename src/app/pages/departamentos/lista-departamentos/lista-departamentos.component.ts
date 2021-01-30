
import { Component, OnInit } from '@angular/core';
import { Departamento } from './../model/departamento';
import { DepartamentoService, DropdownService} from './../service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroDepartamentoComponent } from '../cadastro-departamento/cadastro-departamento.component';
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
  ativo:boolean
  lista:Departamento[] = [];
  msgError: string;
  pageSize:number = 10;
  page:number = 1;

  constructor(private departamentosService: DepartamentoService,
    public modalService: NgbModal, private formBuilder: FormBuilder,
    private dropdownService: DropdownService) { }

    ngOnInit(): void {
      this.msgError= null;
      this.ativoRadio = this.dropdownService.getStatus();
      this.tipoDepartamentoRadio = this.dropdownService.getTipoDepartamentos();
      this.loadListaDepartamentos();
      this.formularioCadastro = this.formBuilder.group({
        idDepartamento: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        numero_leitos: [null, [Validators.required]],
        ativo: [true],
        tipodepartamento:[1],
        descricao:[null]
      })

      this.formularioAtualizar = this.formBuilder.group({
        idDepartamento: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        numero_leitos: [null, [Validators.required]],
        ativo: [true],
        tipodepartamento:[1],
        descricao:[null]
      })
    }
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

      this.formularioAtualizar.patchValue({
        idDepartamento: departamentos.idDepartamento,
        nome:departamentos.nome,
        numero_leitos: departamentos.numero_leitos,
        ativo: departamentos.ativo,
        tipodepartamento: departamentos.tipodepartamento.idTipoDepartamento,
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
    }
