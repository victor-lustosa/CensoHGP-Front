import { Component, OnInit } from '@angular/core';
import { IncidenteService } from '../service/incidente.service';
import { Incidente } from '../model/incidente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroIncidenteComponent } from '../cadastro-incidente/cadastro-incidente.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-incidentes',
  templateUrl: './lista-incidentes.component.html',
  styleUrls: ['./lista-incidentes.component.scss']
})
export class ListaIncidentesComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  idFator:number = 0;
  status: boolean;
  lista: Incidente[] = [];
  msgError: string;
  sucesso: boolean = false;
  searchText: string;
  pageSize = 10;
  page = 1;

  constructor(private incidentesService: IncidenteService,  public modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.msgError= null;
    this.loadListaIncidentes();
    this.formularioCadastro = this.formBuilder.group({
      idIncidente: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idIncidente: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null]
    })
  }
  limpar(){
      this.searchText = '';
      return this.searchText;
  }
  cadastrar(){
    const modalRef =  this.modalService.open(CadastroIncidenteComponent, { size: 'lg' });
    modalRef.componentInstance.formulario = this.formularioCadastro;
    this.loadListaIncidentes();
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroIncidenteComponent, { size: 'lg' });
    if(this.formularioAtualizar != null){
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }
    this.loadListaIncidentes();
  }
  editar(id:number){
    this.incidentesService.getById(id).subscribe((incidentes) => {
      console.log(incidentes);
      this.updateForm(incidentes);
      console.log(this.formularioAtualizar)
      if(this.formularioAtualizar != null){
        this.atualizar();
      }
    })
  }
  updateForm(incidentes: Incidente){

    this.formularioAtualizar.patchValue({
      idIncidente: incidentes.idIncidente,
      nome:incidentes.nome,
      descricao: incidentes.descricao
    })
  }
  loadListaIncidentes() {
    this.incidentesService.getAll()
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
