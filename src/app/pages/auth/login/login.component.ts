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
  perfil: string;
  public botaoLogin: string = '';
  public botaoDisabled: boolean = false;
  public routers: typeof routes = routes;
  constructor(private authService: AuthService, private router: Router) { }
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.botaoLogin = 'entrar';
    this.formulario = new FormGroup({
      matricula: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }

  sendLoginForm() {
    if (this.formulario.valid) {
      this.botaoLogin = 'entrando';
      this.botaoDisabled = true;
      this.authService.tentarLogar(this.formulario.value).subscribe(
        (response: any) => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.router.navigate([this.routers.DASHBOARD]).then();
        },
        () => {
          this.mensagemErro = 'Usuário e/ou senha incorreto(s).';
        });
    }
  }
}
