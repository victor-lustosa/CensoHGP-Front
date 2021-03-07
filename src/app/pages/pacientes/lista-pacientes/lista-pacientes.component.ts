import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from '../model/Paciente';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  searchText: string;
  constructor(private pacientesService: PacienteService,
    public modalService: NgbModal) { }
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

    // lista: Paciente[] = [];
    paginaAtual : number = 1 ;
    contador : number = 10;
    mensagem: string;
    MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
    ngOnInit(): void {
      this.lista;
      // this.loadListaPacientes();
      CadastroPacienteComponent.atualizando.subscribe(
        () => {
          // this.loadListaPacientes();
        })
      }

      limpar() {
        this.searchText ='';
      }
      verifica(){
        this.paginaAtual = 1;
      }
      cadastrar() {
        const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
          modalRef.componentInstance.tituloModal = "Cadastrar Paciente";
      }
      editar(id: number) {
        this.pacientesService.getById(id).subscribe((pacientes) => {
          const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
          modalRef.componentInstance.tituloModal = "Editar Paciente";
          modalRef.componentInstance.incidente = pacientes;
        }
      )
    }
      descricao(id: number) {
        this.pacientesService.getById(id).subscribe((pacientes) => {
          const modalRef = this.modalService.open(CadastroPacienteComponent, this.MODALOPTIONS);
          modalRef.componentInstance.tituloModal = "Descrição do Paciente";
          modalRef.componentInstance.fatorRisco = pacientes;
        }
      )
    }
  }
