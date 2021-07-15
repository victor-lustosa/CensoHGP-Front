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
  public mensagemErroLogin: string = '';
  perfil: string;
  public botaoLogin: string = 'Entrar';
  public botaoDisabled: boolean = false;
  validErro:boolean = false;
  public routers: typeof routes = routes;
  constructor(private authService: AuthService, private router: Router) { }
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }

  public aplicaCssErro(campo?: any) {
    if (!this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      !this.formulario.get('matricula').valid && !this.formulario.get('matricula').touched &&
      campo == 'senha') {
      this.mensagemErro = 'Senha é obrigatória'
      return 'border-red';
    } else if (this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      !this.formulario.get('matricula').valid && this.formulario.get('matricula').touched &&
      campo == 'matricula') {
      this.mensagemErro = 'Matrícula é obrigatória'
      return 'border-red';
    }
    if (!this.formulario.get('senha').valid && !this.formulario.get('senha').touched &&
      !this.formulario.get('matricula').valid && this.formulario.get('matricula').touched &&
      campo == 'matricula') {
      this.mensagemErro = 'Matrícula é obrigatória'
      return 'border-red';
    } else if (!this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      this.formulario.get('matricula').valid && this.formulario.get('matricula').touched &&
      campo == 'senha') {
      this.mensagemErro = 'Senha é obrigatória'
      return 'border-red';
    }
    if (this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      this.formulario.get('matricula').valid && this.formulario.get('matricula').touched &&
      campo == 'senha') {
      this.mensagemErro = ''
      return '';
    }
    if (!this.formulario.get('senha').valid && this.formulario.get('senha').touched &&
      !this.formulario.get('matricula').valid && this.formulario.get('matricula').touched) {
      this.mensagemErro = 'Matrícula e senha são obrigatórios'
      return 'border-red';
    }
    if (campo == 'matricula' && !this.formulario.get('matricula').valid && this.validErro == true) {
      this.mensagemErro = 'Matrícula é obrigatória'
      return 'border-red';
    }else if ( !this.formulario.get('senha').valid && !this.formulario.get('matricula').valid && this.validErro == true) {
    this.mensagemErro = 'Matrícula e senha são obrigatórios'
      return 'border-red';
    }
    else if (campo == 'senha' && !this.formulario.get('senha').valid && this.validErro == true) {
      this.mensagemErro = 'Senha é obrigatória'
      return 'border-red';
    }

  }

  valid() {
    if (this.formulario.valid) {
      this.mensagemErro = '';
      this.sendLoginForm();
    }
    else {
      if (this.formulario.get('senha').valid &&this.formulario.get('senha').touched &&
        !this.formulario.get('matricula').valid && !this.formulario.get('matricula').touched ) {
            this.validErro = true;
        this.aplicaCssErro('matricula');
      }  if (!this.formulario.get('senha').valid && !this.formulario.get('senha').touched &&
        this.formulario.get('matricula').valid && this.formulario.get('matricula').touched) {
            this.validErro = true;
        this.aplicaCssErro('senha')
      } if(!this.formulario.get('senha').valid && !this.formulario.get('senha').touched &&
        !this.formulario.get('matricula').valid && !this.formulario.get('matricula').touched) {
        this.validErro = true;
        this.aplicaCssErro('matricula');
        this.aplicaCssErro('senha')
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
            setTimeout(() => {  this.mensagemErroLogin = ''},1400 );
          this.mensagemErroLogin = 'Usuário e/ou senha incorreto(s).'
          this.botaoDisabled = false;
          this.botaoLogin = 'Entrar';
        });
    }
  }
}
