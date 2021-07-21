import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { PacienteDTO } from '../model/Paciente.dto';
import { ChecklistPacienteComponent } from '../checklist-paciente/checklist-paciente.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DescricaoPacienteComponent } from '../descricao-paciente/descricao-paciente.component';
import { DepartamentoService } from '../../departamentos/service';
import { Departamento } from '../../departamentos/model/departamento';
import { Paciente } from '../model/Paciente';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  searchText: string;
  constructor(private pacientesService: PacienteService,private router: Router,  private route: ActivatedRoute,
    public modalService: NgbModal, public departamentoService:DepartamentoService) { }
  lista: Paciente[] = [];
  statusSpinner: boolean = false;
  paginaAtual: number = 1;
  contador: number = 10;
  mensagem: string;
  departamento: string = '';
  listaDepartamento: Departamento[];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  ngOnInit(): void {
    this.loadListaPacientes();
    this.loadListaDepartamentos();

    CadastroPacienteComponent.atualizando.subscribe(
      () => {
        this.loadListaPacientes();
      });
  }
  loadListaDepartamentos(){
     this.departamentoService.getAllAtivos().subscribe(
       data => {
         this.listaDepartamento = data
       }
     );
  }
  loadListaPacientes() {
    this.statusSpinner = true;
    this.lista = [];
    this.paginaAtual = 1;
    if(this.departamento != ''){
      setTimeout(() => {
      this.pacientesService.getPacientesDepartamento(this.departamento)
        .subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          });
    }, 400);
  }  else{
    setTimeout(() => {
      this.pacientesService.getAllPacientes()
        .subscribe(
          data => {
            this.lista = data;
            this.statusSpinner = false;
          });
    }, 400);
  }}
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

  historicoChecklist(id:number){
    this.router.navigate(['/pacientes/historico-checklist', id], { relativeTo: this.route });
}

gerarTransferencia(id:number, nome:string){
  this.router.navigate(['/pacientes/transferencia-paciente/'+ id]);
}

  descricao(paciente:Paciente) {
        const modalRef = this.modalService.open(DescricaoPacienteComponent, this.MODALOPTIONS);
      modalRef.componentInstance.tituloModal = 'Descrição do Paciente';
      modalRef.componentInstance.paciente = paciente;

  }
}
