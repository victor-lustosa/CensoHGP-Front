import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-lista-precaucoes',
  templateUrl: './lista-precaucoes.component.html',
  styleUrls: ['./lista-precaucoes.component.scss']
})
export class ListaPrecaucoesComponent implements OnInit {
  formulario: FormGroup;
  constructor() { }
  tableData = [
    { userId: 1, nome: 'G', cpf: '23432435471', rg: '1321545', dataNascimento: '12-03-1996' },
    { userId: 2, prontuario: '3493824', nome: 'Iury', cpf: '21354687356', rg: '326491', dataNascimento: '17-01-1997'  },
    { userId: 3, prontuario: '3493824', nome: 'Guilherme', cpf: '3654863213', rg: '9364384', dataNascimento: '20-02-1997'  },
    { userId: 4, prontuario: '3493824', nome: 'Helena', cpf: '3622121156', rg: '789215', dataNascimento: '13-08-1991'  },
    { userId: 5, prontuario: '3493824', nome: 'Lara', cpf: '1047242205', rg: '635497', dataNascimento: '01-02-1992'  },
    { userId: 6, prontuario: '3493824', nome: 'Victor', cpf: '11102535041', rg: '1045548', dataNascimento: '06-06-1972'  }
  ];
  ngOnInit(): void {
  }

  pesquisar() {}
}
