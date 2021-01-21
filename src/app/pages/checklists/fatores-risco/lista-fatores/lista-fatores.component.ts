import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';
import { FormControl } from '@angular/forms';
import { ModalService } from 'src/app/theme/shared/components/modal/modal.service';

@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  status: boolean;
  lista: Fatores[];
  msgError: string;
  queryField: FormControl;
  sucesso: boolean = false;
  searchText: string;
  title:string = 'Cadastro Fatores de Risco';
  constructor(private fatoresService: FatorRiscoService, private modal: ModalService) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaFatores();
  }
  openDialog(){
    this.modal.showCadastroChecklist(this.title);
  }
  loadListaFatores() {
    this.fatoresService.getAll()
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
