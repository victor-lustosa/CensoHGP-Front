import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../const';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public mensagemErro:string;
  public routers: typeof routes = routes;
  constructor(private service: AuthService, private router: Router) {}
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }
  sendLoginForm() {
    if (this.formulario.valid) {
      this.service.tentarLogar(this.formulario.value).subscribe(
        response => {
          console.log("deu certo");
          // this.service.successfulLogin(response.headers.get('Authorization'));
            console.log(response.headers.get('Authorization'));
          this.router.navigate([this.routers.DASHBOARD]).then();
        }, () => {
            console.log("nao deu certo");
          this.mensagemErro = 'Usuário e/ou senha incorreto(s).'
        })
      }
    }
  }
