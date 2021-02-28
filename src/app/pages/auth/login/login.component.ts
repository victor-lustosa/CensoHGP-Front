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
  ) { }

  public formulario: FormGroup;
    public ngOnInit(): void {
      this.formulario = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      });
    }
    public sendLoginForm(): void {
        this.service.login(this.formulario);
      if (this.formulario.valid) {


      }
    }
}
