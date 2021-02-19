import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from '../model/Paciente';
import { NgbDatepicker, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { PrecaucaoService } from '../../precaucoes/service/precaucao.service';
import { Precaucao } from '../../precaucoes/model/precaucao';
import { FormValidations } from 'src/app/theme/shared/form-validations';
@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  formularioCadastro: FormGroup = null;
  formularioAtualizar: FormGroup = null;
  msgError: string;
  pageSize: number = 10;
  page: number = 1;
  pesquisaForm: FormGroup = null;
  lista: Paciente[] = [];
  listaPrecaucoes: Precaucao[] = [];
  statusPesquisa: boolean = false;
  mensagem: string;
  listaChecklist = ['Gotícula', 'Aerossois', 'Padrão', 'Contato'];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private departamentosService: PacienteService,
    public modalService: NgbModal, private formBuilder: FormBuilder,
    private precaucaoService: PrecaucaoService) { }

  ngOnInit(): void {
    this.msgError = null;
    this.loadListaPacientes();
    this.loadListaPrecaucao();
    this.buildPrecaucoes();
    CadastroPacienteComponent.atualizando.subscribe(
      success => {
        this.loadListaPacientes();
      })
    this.formularioCadastro = this.formBuilder.group({
      idPaciente: [null],
      prontuario: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null],
      nomeMae: [null],
      cpf: [null],
      sexo: [null],
      dataNascimento: [null],
      precaucao: this.buildPrecaucoes(),
      departamento: [null]
    })
    this.formularioAtualizar = this.formBuilder.group({
      idPaciente: [null],
      prontuario: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null],
      nomeMae: [null],
      cpf: [null],
      sexo: [null],
      dataNascimento: [null],
      precaucao: this.buildPrecaucoes(),
      departamento: [null]
    })
    this.pesquisaForm = new FormGroup({
      pesquisar: new FormControl(null, Validators.required)
    });
  }
  loadListaPrecaucao() {
    this.precaucaoService.getAll().subscribe(
      data => {
        this.listaPrecaucoes = data;
        console.log('lista: ', this.listaPrecaucoes)
      })
  }
  buildPrecaucoes() {
    const values = this.listaChecklist.map(v => new FormControl(false), FormValidations.requiredMinCheckbox(1));
    console.log('values da lista: ', values)
    return this.formBuilder.array(values);
  }
  limpar() {
  }
  cadastrar() {
    const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
    modalRef.componentInstance.formulario = this.formularioCadastro;
    modalRef.componentInstance.listaChecklist = this.listaChecklist;
  }
  atualizar() {
    const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
    if (this.formularioAtualizar != null) {
      modalRef.componentInstance.formulario = this.formularioAtualizar;
      modalRef.componentInstance.listaPrecaucoes = this.listaChecklist;
    }
  }
  editar(id: number) {
    this.departamentosService.getById(id).subscribe((pacientes) => {
      this.updateForm(pacientes);
      if (this.formularioAtualizar != null) {
        this.atualizar();
      }
    })
  }

  refresh() {
    if (this.pesquisaForm.get('pesquisar').value === '') {
      this.mensagem = null;
      this.loadListaPacientes();
    }
  }
  updateForm(pacientes: Paciente) {
    this.formularioAtualizar.patchValue({
      idPaciente: pacientes.idPaciente,
      prontuario: pacientes.prontuario,
      nome: pacientes.nome,
      nomeMae: pacientes.nomeMae,
      cpf: pacientes.cpf,
      sexo: pacientes.sexo,
      dataNascimento: pacientes.dataNascimento,
      precaucao: pacientes.precaucao,
      departamento: pacientes.departamento
    })
  }
  pesquisa() { };
  loadListaPacientes() {
    this.departamentosService.getAll()
      .subscribe(
        data => {
          this.lista = data;
        })
  }
}
