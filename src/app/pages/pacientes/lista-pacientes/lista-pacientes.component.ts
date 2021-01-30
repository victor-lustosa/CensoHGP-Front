import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  status: boolean;
  searchText:string;
  // lista:Pacientes[] = [];
  msgError: string;
  pageSize:number = 10;
  page:number = 1;
  collectionSize:number;
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
      console.log('this.lista.length:'+this.lista.length)
      let i = 0;
      while(i<=this.lista.length){
        i = i +1;
      }
      this.collectionSize =  i;
      console.log("this.collectionSize "+  this.collectionSize)
      // this.loadListaPacientes();
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
    }
    limpar(){
      this.searchText = '';
      return this.searchText;
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
        console.log(departamentos);
        this.updateForm(departamentos);
        console.log(this.formularioAtualizar)
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
    // loadListaPacientes() {
    //   this.departamentosService.getAll()
    //   .subscribe(
    //     data => {
    //       this.lista = data;
    //       console.log(data);
    //     },
    //     error => {
    //       console.log('Erro serviço ' + error)
    //     })
    //   }
  }
