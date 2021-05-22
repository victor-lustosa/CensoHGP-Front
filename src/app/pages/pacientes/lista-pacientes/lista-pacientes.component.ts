import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from '../model/Paciente';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { PacienteDTO } from '../model/Paciente.dto';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  searchText: string;
  constructor(private pacientesService: PacienteService,
    public modalService: NgbModal) { }
  lista: PacienteDTO[] = [];
  statusSpinner: boolean = false;
  paginaAtual: number = 1;
  contador: number = 10;
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  ngOnInit(): void {
    this.loadListaPacientes();
    CadastroPacienteComponent.atualizando.subscribe(
      () => {
        this.loadListaPacientes();
      });
  }
  loadListaPacientes() {
    this.statusSpinner = true;
    setTimeout(() => {
      this.pacientesService.getAllPacientes()
        .subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          });
    }, 400);
  }
  limpar() {
    this.searchText = '';
  }
  verifica() {
    this.paginaAtual = 1;
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
    modalRef.componentInstance.tituloModal = 'Cadastrar Paciente';
  }
  editar(id: number) {
    this.pacientesService.getById(id).subscribe((pacientes) => {
      const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Editar Paciente';
      modalRef.componentInstance.incidente = pacientes;
    }
    );
  }
  descricao(id: number) {
    this.pacientesService.getById(id).subscribe((pacientes) => {
      const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Descrição do Paciente';
      modalRef.componentInstance.fatorRisco = pacientes;
    }
    );
  }
}
