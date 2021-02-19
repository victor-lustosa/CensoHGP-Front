import { Component, OnInit } from '@angular/core';
import { ErrorMsgService } from './service/error-msg.service';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss'],
  providers: [ErrorMsgService]
})
export class ErrorMsgComponent implements OnInit {


  mensagemParaUsuario: string = null;

  constructor(private mensagemService:ErrorMsgService) { }

  ngOnInit(): void {
    this.mensagemService.mensagemErro.subscribe(
      (mensagemErro: string)=> {
        this.mensagemParaUsuario = mensagemErro
        console.log('entrei na mensagem de erro: ',this.mensagemParaUsuario)
      })
    }
    get ErroMsg(){
      if(this.mensagemParaUsuario !== null){

        return this.mensagemParaUsuario;
      }
      else{
        return null
      }
    }
  }
