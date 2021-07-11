import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../const';
import { AuthService } from '../service/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public mensagemErro: string = '';
  // public messageValidation: string = '';
  perfil: string;
  public botaoLogin: string = 'Entrar';
  public botaoDisabled: boolean = false;
  public routers: typeof routes = routes;
  public validMatricula: boolean = false;
  public validSenha: boolean = false;
  public validAmbos: boolean = false;
    public erroFormMatricula: boolean = false;
    public erroFormSenha: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }
  public verificaValidTouched(campo: any) {
    if (!this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      campo == 'senha' && this.validMatricula == false) {
      this.validSenha = true;
      this.validMatricula = false;
      this.validAmbos = false;
      this.mensagemErro = 'Senha é obrigatória'
      return true;
    } else
    if (!this.formulario.get('matricula').valid && this.formulario.get('matricula').touched &&
      campo == 'matricula' && this.validSenha == false) {
      this.validMatricula = true;
      this.validSenha = false;
      this.validAmbos = false;
      this.mensagemErro = 'Matrícula é obrigatória'
      return true;
    }else
    if (!this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      !this.formulario.get('matricula').valid && this.formulario.get('matricula').touched
    ) {
      this.validAmbos = true;
      this.validSenha = false;
      this.validMatricula = false;
      this.mensagemErro = 'Matrícula e senha é obrigatórios'
      return true;
    }else
    if (this.formulario.get('senha').valid  &&
      this.formulario.get('matricula').valid && this.validAmbos == true) {

      this.validSenha = false;
      this.validMatricula = false;
      this.mensagemErro = ''
    }

  }
  public aplicaCssErro(campo?: any) {
      if(campo =='senha' && this.erroFormSenha == true && this.erroFormMatricula == false){
        return 'border-red';
      }else if(campo =='matricula' && this.erroFormMatricula == true && this.erroFormSenha == false){
        return 'border-red';
      }else if(this.erroFormMatricula == true && this.erroFormSenha == true){
        return 'border-red';
      }else {
        return {
        'border-red': this.verificaValidTouched(campo)
      };
    }

  }

  valid() {
    if (this.formulario.valid) {
      this.validAmbos = false;
      this.validSenha = false;
      this.validMatricula = false;
      this.mensagemErro = '';
      this.sendLoginForm();
    }
    else {
      this.erroFormSenha = true;
      this.erroFormMatricula = true;
      if (this.formulario.get('senha').touched &&
         !this.formulario.get('matricula').touched) {

        this.mensagemErro = 'Matrícula é obrigatória'
        this.aplicaCssErro('matricula');
      } else if (!this.formulario.get('senha').touched &&
        this.formulario.get('matricula').touched) {
        this.mensagemErro = 'Senha é obrigatória'
        this.aplicaCssErro('senha')
      } else {
        this.aplicaCssErro('matricula');
          this.aplicaCssErro('senha')
        this.mensagemErro = 'Matrícula e senha são obrigatórios'
        this.aplicaCssErro()
      }
    }
  }
  sendLoginForm() {
    if (this.formulario.valid) {
      this.botaoLogin = 'Entrando';
      this.botaoDisabled = true;
      this.authService.tentarLogar(this.formulario.value).subscribe(
        (response: any) => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.router.navigate([this.routers.DASHBOARD]).then();
        },
        () => {
          this.mensagemErro = 'Usuário e/ou senha incorreto(s).';
          this.botaoDisabled = false;
          this.botaoLogin = 'Entrar';

        });
    }
  }
}
