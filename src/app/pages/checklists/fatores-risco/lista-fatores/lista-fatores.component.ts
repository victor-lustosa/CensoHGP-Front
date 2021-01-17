import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {

  pesquisa: string;
  status: boolean;
  lista: Fatores[];
  msgError: string;

  constructor(private fatoresService: FatorRiscoService,
    private router: Router) { }

    ngOnInit(): void {
      if(this.pesquisa == null)
      this.loadListaFatores();
      else
      this.lista
      this.msgError= null;
    }

    loadListaFatores() {
      this.fatoresService.getListaFatores()
      .subscribe(
        data => {
          this.lista = data;
          console.log(data);
        },
        error => {
          console.log('Erro serviço ' + error)
        })
      }

      pesquisar(): void {
        this.fatoresService
        .getBusca(this.pesquisa)
        .subscribe(data =>{
          this.lista = data;
          console.log(data);
        })
      };

      novoCadastro(){
        this.router.navigate(['/checklists/cadastro-fatores/novo']);
      }

      editar(id:number){
        this.router.navigate(['/checklists/cadastro-fatores/editar/'+ id]);
      }
    }
