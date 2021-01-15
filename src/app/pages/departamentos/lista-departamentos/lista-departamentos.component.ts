
import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Departamento } from './../model/departamento';
import { DepartamentoService} from './../service'
@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  pesquisa: string;
  status: boolean;

  //formulario: FormGroup;
  lista: Departamento[];
  msgError: string;

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    if(this.pesquisa==null)
    this.loadListaDepartamentos();
    else
    this.lista
    this.msgError= null;
  }
  // Chama o serviço para obtém todas os Departamentos
  loadListaDepartamentos() {
    this.departamentoService.getListaDepartamentos()
    .subscribe(
      data => {
        this.lista = data;
        console.log(data);
      },
      error => {
        console.log('Erro serviço ' + error)
      })
    }
    // deleta uma Departamento
    public desativarDepartamento(departamento: Departamento) {
      this.departamentoService.deleteDepartamento(departamento).subscribe(
        (sucesso) => {
          console.log(sucesso);
          // this.loadListaDepartamentos();
        },
        error => {
          this.msgError = error;
          console.log("error deleteDepartamento ListaDepartamentoComponent : " + error);
        });
      }

      public editDepartamento(departamento: Departamento): void {
      }

      pesquisar(): void {
        this.departamentoService
        .getBusca(this.pesquisa)
        .subscribe(data =>{
        this.lista = data;
        console.log(data);
      })
      };

    }
