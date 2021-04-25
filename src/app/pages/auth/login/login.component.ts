import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation';
import { environment } from 'src/environments/environment';
import { routes } from '../../const';
import { Usuario } from '../../usuarios/model/usuario';
import { UsuarioDTO } from '../../usuarios/model/usuario-dto';
import { UsuarioDTOService } from '../../usuarios/service/usuario.dto.service';
import { UsuarioService } from '../../usuarios/service/usuario.service';
import { AuthService } from '../service/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public mensagemErro:string;
  public routers: typeof routes = routes;
  usuario:string;
  constructor(private service: AuthService, private router: Router,private usuarioService:UsuarioService,
    private menu:NavigationItem, private http:HttpClient
  ) {}
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });

  }

  getUsers(matricula:string) {
    if (this.formulario.valid) {
      return this.http.get<string>(`${environment.API}apicensohgp/usuario/matricula/${matricula}`).
      pipe(retry(1), catchError(this.handleError))
// catch(err=> err.message);

    }
  }
  sendLoginForm() {
    this.getUsers(this.formulario.get("matricula").value).subscribe(
      data =>{this.usuario = data} );
    console.log(this.usuario)
      this.menu.get(this.usuario);
      this.service.tentarLogar(this.formulario.value).subscribe(
        response => {
          console.log("deu certo");
          this.service.successfulLogin(response.headers.get('Authorization'));
          console.log(response.headers.get('Authorization'));
          this.router.navigate([this.routers.DASHBOARD]).then();
        }, () => {
          console.log("nao deu certo");
          this.mensagemErro = 'Usuário e/ou senha incorreto(s).'
        })

      }
      handleError(error: HttpErrorResponse) {
          return throwError(error.error.message);
      }
    }
