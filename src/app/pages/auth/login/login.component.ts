import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../const/routes';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService,
    private router: Router) { }
  public routers: typeof routes = routes;
  public formulario: FormGroup;
  public email = 'franciscovictor@unitins.br';
   public password = '123456';
    public ngOnInit(): void {
      this.formulario = new FormGroup({
        email: new FormControl(this.email, [Validators.required, Validators.email]),
        password: new FormControl(this.password, [Validators.required])
      });
    }
    public sendLoginForm(): void {
      if (this.formulario.valid) {
        this.service.login();
        this.router.navigate([this.routers.DASHBOARD]).then();
      }
    }
}
