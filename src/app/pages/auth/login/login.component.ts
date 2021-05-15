import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation';
import { routes } from '../../const';
import { UsuarioService } from '../../usuarios/service/usuario.service';
import { AuthService } from '../service/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { exhaustMap, map } from 'rxjs/operators';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public mensagemErro: string;
  perfil: string;
  public routers: typeof routes = routes;
  constructor(private authService: AuthService, private router: Router,
    private menu: NavigationItem) { }
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }

  sendLoginForm() {
    if (this.formulario.valid) {
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
