import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from '../model/Paciente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  formularioCadastro:FormGroup =null;
  formularioAtualizar:FormGroup =null;
  msgError: string;
  pageSize:number = 10;
  page:number = 1;
  pesquisaForm: FormGroup = null;
  lista:Paciente[]=[];
  constructor(private departamentosService: PacienteService,
    public modalService: NgbModal, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.msgError= null;
       this.loadListaPacientes();
      this.formularioCadastro = this.formBuilder.group({
        idPaciente: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao:[null]
      })
      this.formularioAtualizar = this.formBuilder.group({
        idPaciente: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao:[null]
      })
      this.pesquisaForm = new FormGroup({
        pesquisar: new FormControl(null, Validators.required)
      });
    }
    limpar(){
    }
    cadastrar(){
      const modalRef =  this.modalService.open(CadastroPacienteComponent, { size: 'lg' });
      modalRef.componentInstance.formulario = this.formularioCadastro;

    }
    atualizar() {
      const modalRef = this.modalService.open(CadastroPacienteComponent, { size: 'lg' });
      if(this.formularioAtualizar != null){
        modalRef.componentInstance.formulario = this.formularioAtualizar;
      }
    }
    editar(id:number){
      this.departamentosService.getById(id).subscribe((departamentos) => {
        this.updateForm(departamentos);
        if(this.formularioAtualizar != null){
          this.atualizar();
        }
      })
    }
    updateForm(departamentos: Paciente){
      this.formularioAtualizar.patchValue({
        idPaciente: departamentos.idPaciente,
        nome:departamentos.nome,
        descricao: departamentos.descricao
      })
    }
    pesquisa(){};
    loadListaPacientes() {
      this.departamentosService.getAll()
      .subscribe(
        data => {
          this.lista = data;
        })
      }
  }
