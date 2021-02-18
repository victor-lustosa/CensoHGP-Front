import { Component, Input, OnInit } from '@angular/core';
import { CadastroDepartamentoComponent } from 'src/app/pages/departamentos/cadastro-departamento/cadastro-departamento.component';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {


 errorMessage: string = null;

  constructor() { }

  ngOnInit(): void {

  }
  get ErroMsg(){
    if(this.errorMessage !== null){
     CadastroDepartamentoComponent.erroBack.subscribe(
      (erro) => {
        console.log("eorro do msg"+erro)
        return this.errorMessage = erro;
      })}
      else{
        return null
      }
    }
  }
