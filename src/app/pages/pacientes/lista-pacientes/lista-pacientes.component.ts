import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from '../model/Paciente';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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
  pageSize: number = 10;
  page: number = 1;
  pesquisaForm: FormGroup = null;
  // lista: Paciente[] = [];
  listaPrecaucoes: Precaucao[] = [];
  statusPesquisa: boolean = false;
  mensagem: string;
  listaChecklist = ['Gotícula', 'Aerossois', 'Padrão', 'Contato'];
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private pacientesService: PacienteService,
    public modalService: NgbModal, private formBuilder: FormBuilder,
    private precaucaoService: PrecaucaoService) { }
    @Input('data')  lista = [
      { prontuario: '34938234343243333333333333333333333333333333242344', nome: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', nomeMae: 'kuyuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true, departamento:"EMADE"},
      { idPaciente:1,prontuario: '3493824', nome: 'sdddddddddddddddddddddsdsdsdsdsdsds', nomeMae: 'kkkkkkkkkkkkkkkkkkkkkkkkkkkk',cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997', sexo: true,departamento:"PEDIATRIA" },
      {  prontuario: '3493824', nome: 'Guilherme', nomeMae: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997' , sexo: true,departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Helena', nomeMae: 'Guilherme', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991', sexo: true, departamento:"PEDIATRIA" },
      {  prontuario: '3493824', nome: 'Lara',  nomeMae: 'Guilherme',cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992' , sexo: true,departamento:"PEDIATRIA" },
      {  prontuario: '3493824', nome: 'Victor', nomeMae: 'Guilherme', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  , sexo: true,departamento:"CENTRO"},
      {  prontuario: '3493824', nome: 'Maria', nomeMae: 'Maria',cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996', sexo: true,departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Iury', nomeMae: 'Maria',cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997', sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Guilherme',nomeMae: 'Maria', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997' , sexo: true, departamento:"EMADE"},
      {  prontuario: '3493824', nome: 'Helena', nomeMae: 'Maria',cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991' , sexo: true, departamento:"EMADE"},
      {  prontuario: '3493824', nome: 'Lara', nomeMae: 'Maria',cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992', sexo: true,departamento:"EMADE"  },
      {  prontuario: '3493824', nome: 'Victor',nomeMae: 'Maria', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972' , sexo: true,departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Maria',nomeMae: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true,departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Iury',nomeMae: 'Maria', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997' , sexo: true,  departamento:"EMADE"},
      {  prontuario: '3493824', nome: 'Guilherme',nomeMae: 'Maria', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Helena',nomeMae: 'Maria', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  , sexo: true, departamento:"EMADE"},
      {  prontuario: '3493824', nome: 'Lara', nomeMae: 'Maria',cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Victor', nomeMae: 'Maria',cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Maria', nomeMae: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true, departamento:"EMADE"},
      {  prontuario: '3493824', nome: 'Iury', nomeMae: 'Maria',cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Guilherme',nomeMae: 'Maria', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Helena',nomeMae: 'Maria', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Lara',nomeMae: 'Maria', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992' , sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Victor',nomeMae: 'Maria', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972', sexo: true, departamento:"EMADE" },
      {  prontuario: '3493824', nome: 'Maria',nomeMae: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true,},
      {  prontuario: '3493824', nome: 'Iury', nomeMae: 'Maria',cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997', sexo: true,  },
      {  prontuario: '3493824', nome: 'Guilherme',nomeMae: 'Maria', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997' , sexo: true, },
      {  prontuario: '3493824', nome: 'Helena',nomeMae: 'Maria', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991' , sexo: true, },
      {  prontuario: '3493824', nome: 'Lara',nomeMae: 'Maria', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992', sexo: true,  },
      {  prontuario: '3493824', nome: 'Victor',nomeMae: 'Maria', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972' , sexo: true, },
      {  prontuario: '3493824', nome: 'Maria',nomeMae: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true, },
      {  prontuario: '3493824', nome: 'Iury',nomeMae: 'Maria', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997' , sexo: true,  },
      {  prontuario: '3493824', nome: 'Guilherme', nomeMae: 'Maria',cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  , sexo: true, },
      {  prontuario: '3493824', nome: 'Helena', nomeMae: 'Maria',cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  , sexo: true, },
      {  prontuario: '3493824', nome: 'Lara',nomeMae: 'Maria', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992' , sexo: true,  },
      {  prontuario: '3493824', nome: 'Victor',nomeMae: 'Maria', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972' , sexo: true,  },
      {  prontuario: '3493824', nome: 'Maria', nomeMae: 'Maria',cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true,},
      {  prontuario: '3493824', nome: 'Iury', nomeMae: 'Maria',cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  , sexo: true,},
      {  prontuario: '3493824', nome: 'Guilherme',nomeMae: 'Maria', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997', sexo: true,  },
      {  prontuario: '3493824', nome: 'Helena',nomeMae: 'Maria', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991', sexo: true,  },
      {  prontuario: '3493824', nome: 'Lara',nomeMae: 'Maria', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992' , sexo: true, },
      {  prontuario: '3493824', nome: 'Victor',nomeMae: 'Maria', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972' , sexo: true, },
      {  prontuario: '3493824', nome: 'Maria', nomeMae: 'Maria',cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' , sexo: true, },
      {  prontuario: '3493824', nome: 'Iury', nomeMae: 'Maria',cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997' , sexo: true,  },
      {  prontuario: '3493824', nome: 'Guilherme',nomeMae: 'Maria', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997', sexo: true,   },
      {  prontuario: '3493824', nome: 'Helena', nomeMae: 'Maria',cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991' , sexo: true,  },
      {  prontuario: '3493824', nome: 'Lara', nomeMae: 'Maria',cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992' , sexo: true,  },
      {  prontuario: '3493824', nome: 'Victor', nomeMae: 'Maria',cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972', sexo: true,   }
    ];
    ngOnInit(): void {
      this.lista;
      // this.loadListaPacientes();
      this.loadListaPrecaucao();
      this.buildPrecaucoes();
      CadastroPacienteComponent.atualizando.subscribe(
        () => {
          // this.loadListaPacientes();
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
          const values = this.listaChecklist.map(() => new FormControl(false), FormValidations.requiredMinCheckbox(1));
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
          this.pacientesService.getById(id).subscribe((pacientes) => {
            this.updateForm(pacientes);
            if (this.formularioAtualizar != null) {
              this.atualizar();
            }
          })
        }
        descricao(id: number) {
          this.pacientesService.getById(id).subscribe((fatores) => {
            const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
            modalRef.componentInstance.tituloModal = "Descrição do departamento";
            modalRef.componentInstance.fatorRisco = fatores;
          }
        )
      }
      refresh() {
        if (this.pesquisaForm.get('pesquisar').value === '') {
          this.mensagem = null;
          // this.loadListaPacientes();
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
      // loadListaPacientes() {
      //   this.pacientesService.getAll()
      //     .subscribe(
      //       data => {
      //         this.lista = data;
      //       })
      // }
    }
