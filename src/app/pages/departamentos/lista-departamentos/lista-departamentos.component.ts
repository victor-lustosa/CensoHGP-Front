
import { Component, OnInit } from '@angular/core';
import { Departamentos } from './../model/departamentos';
import { DepartamentoService} from './../service'

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {
  status: boolean;
  searchText:string;
  arrayPageSize:any[] = [];
  lista:Departamentos[] = [];
  msgError: string;
  pageSize:number = 10;
  page:number = 1;
  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.loadListaDepartamentos();
    this.msgError= null;
  }
  // Chama o serviço para obtém todas os Departamentos
  loadListaDepartamentos() {
    this.departamentoService.getAll().subscribe(
      data => {
        this.lista = data,
        console.log(data)}

    )
  }
  // deleta uma Departamento
  public desativarDepartamento(id:number) {
    this.departamentoService.disable(id).subscribe(
      (sucesso) => {
        console.log(sucesso);
      },
      error => {
        this.msgError = error;
        console.log("error deleteDepartamento ListaDepartamentoComponent : " + error);
      });
    }

  }
