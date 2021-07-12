import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { PacienteDTO } from '../model/Paciente.dto';
import { ChecklistPacienteComponent } from '../checklist-paciente/checklist-paciente.component';

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
  departamento: string = '';
  listaDepartamento: any[];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  ngOnInit(): void {
    this.loadListaPacientes();
   this.pacientesService.getAllAtivos().subscribe(
    data => {
      this.listaDepartamento = data
    }
   );
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
  filtroDepartamento(value: any) {
    this.departamento = value;
    this.loadListaPacientes();
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
    this.pacientesService.getById(id).subscribe((paciente) => {
      const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Editar Paciente';
      modalRef.componentInstance.paciente = paciente;
    }
    );
  }
  gerarChecklist(id:number, nome:string){
      const modalRef = this.modalService.open(ChecklistPacienteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.idPaciente = id;
      modalRef.componentInstance.nomePaciente = nome;
  }
  descricao(id: number) {
    this.pacientesService.getById(id).subscribe((paciente) => {
      const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Descrição do Paciente';
      modalRef.componentInstance.paciente = paciente;
    }
    );
  }
}
