import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroModalComponent } from 'src/app/theme/shared/components/modal/cadastro-modal/cadastro-modal.component';

@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  idFator:number = 0;
  status: boolean;
  lista: Fatores[];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  title:string = 'Cadastro Fatores de Risco';
  constructor(private fatoresService: FatorRiscoService,  public modalService: NgbModal) { }

  ngOnInit(): void {
    this.msgError= null;
    this.loadListaFatores();
  }
  openModal() {
    const modalRef =  this.modalService.open(CadastroModalComponent);
    modalRef.componentInstance.id = this.idFator;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }
  )
}
obterId(id:number){
  this.idFator = id;
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
