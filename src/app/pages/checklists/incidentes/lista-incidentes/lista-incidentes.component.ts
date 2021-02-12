import { Component, OnInit } from '@angular/core';
import { IncidenteService } from '../service/incidente.service';
import { Incidente } from '../model/incidente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroIncidenteComponent } from '../cadastro-incidente/cadastro-incidente.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

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
  lista:Incidente[];
  msgError: string;
  sucesso: boolean = false;
  pageSize = 10;
  page = 1;
  varConfirm: string;
  incidenteAux: Incidente;
  pesquisaForm: FormGroup = null;
  statusPesquisa: boolean = false;
  constructor(private incidentesService: IncidenteService,  public modalService: NgbModal, private formBuilder: FormBuilder, location: Location) { }

  ngOnInit(): void {

    this.msgError= null;
    this.loadListaIncidentes();
    this.formularioCadastro = this.formBuilder.group({
      idIncidente: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idIncidente: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  public pesquisa(): void {
    this.statusPesquisa = true;
    this.loadListaIncidentes();
  }
  limpar(){
    this.pesquisaForm.reset;
    this.statusPesquisa = false;
    this.loadListaIncidentes();
    // this.searchText = '';
    // return this.searchText;
  }
  cadastrar(){
    const modalRef =  this.modalService.open(CadastroIncidenteComponent, { size: 'lg' });
    modalRef.componentInstance.tituloModal = "Cadastrar incidente";
    modalRef.componentInstance.formulario = this.formularioCadastro;
    this.loadListaIncidentes();
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroIncidenteComponent, { size: 'lg' });
    if(this.formularioAtualizar != null){
      modalRef.componentInstance.tituloModal = "Editar incidente";
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
      descricao: incidentes.descricao,
      ativo: incidentes.ativo
    })
  }
  loadListaIncidentes() {
    if(this.statusPesquisa === false){
      this.incidentesService.getAll()
      .subscribe(
        data => {
          this.lista = data;
          console.log(data);
        },
        error => {
          console.log('Erro serviço ' + error)
        })}
        else {
          this.incidentesService.getByNome(this.pesquisaForm.get('pesquisar').value).subscribe(
            data => {
              this.lista = data;
              console.log(data);
            },
            error => {
              console.log('Erro serviço ' + error)
            });
          }
        }

        pegaId(id: number) {
          this.incidentesService.getById(id).subscribe((incidentesDis) => {
            if (incidentesDis.ativo === true) {
              this.varConfirm = 'desativar';
            } else {
              this.varConfirm = 'ativar';
            }
            this.incidenteAux = incidentesDis;
          });
        }

        mudarStatus() {
          if (this.incidenteAux.ativo === true) {
            this.incidenteAux.ativo = false;
            this.incidentesService.disable(this.incidenteAux).subscribe(
              error => {
                console.log('Erro na mudança de status: ' + error);
              }
            );
          } else {
            this.incidenteAux.ativo = true;
            this.incidentesService.disable(this.incidenteAux).subscribe(
              error => {
                console.log('Erro na mudança de status: ' + error);
              });
            }
            location.reload();
          }
        }
