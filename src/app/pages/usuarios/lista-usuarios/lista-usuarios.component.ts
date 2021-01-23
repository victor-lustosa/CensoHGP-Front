import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  formulario: FormGroup;
  pageSize = 10;
  page = 1;
  tableData = [
    { userId: 1, nome: 'Fabio', matricula: '2343243', email: 'fabio@gmail.com', status: true, tipo: 'Administrador'},
    { userId: 2, nome: 'Fabricio', matricula: '213152', email: 'fabricio@gmail.com', status: true, tipo: 'Administrador'},
    { userId: 3, nome: 'Julio', matricula: '6875231', email: 'julio@gmail.com', status: true, tipo: 'Enfermeiro'},
    { userId: 4, nome: 'Marcio', matricula: '54623232', email: 'marcio@gmail.com', status: false, tipo: 'Enfermeiro'},
    { userId: 5, nome: 'Alberto', matricula: '6543212', email: 'alberto@gmail.com', status: true, tipo: 'Enfermeiro'},
    { userId: 6, nome: 'Luiz', matricula: '7789541', email: 'luiz@gmail.com', status: true, tipo: 'Enfermeiro'}
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  novoCadastro() {
    this.router.navigate(['/usuarios/cadastro-usuarios']);
  }
  pesquisar() {
  }
}
