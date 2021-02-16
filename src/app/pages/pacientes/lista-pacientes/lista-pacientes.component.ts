import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from '../model/Paciente';
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from '../service/paciente.service';
import { CadastroPacienteComponent } from '../cadastro-paciente/cadastro-paciente.component';
import { Input } from '@angular/core';

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
  // lista:Paciente[]=[];
  statusPesquisa: boolean = false;
  mensagem: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private departamentosService: PacienteService,
    public modalService: NgbModal, private formBuilder: FormBuilder) { }


@Input('data')  lista = [




  { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  },


  { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }, { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }, { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }, { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }, { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }, { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }, { userId: 1, prontuario: '3493824', nome: 'Maria', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },


  { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },


  { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },


  { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },


  { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },


  { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }


];


    ngOnInit(): void {
      this.msgError= null;
      //  this.loadListaPacientes();
      CadastroPacienteComponent.atualizando.subscribe(
        success => {
            // this.loadListaDepartamentos();
          })
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
      const modalRef =  this.modalService.open(CadastroPacienteComponent,this.MODALOPTIONS);
      modalRef.componentInstance.formulario = this.formularioCadastro;

    }
    atualizar() {
      const modalRef = this.modalService.open(CadastroPacienteComponent,this.MODALOPTIONS);
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
          // this.lista = data;
        })
      }
  }
