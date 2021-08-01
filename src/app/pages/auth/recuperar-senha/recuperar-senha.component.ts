import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from '../../const';
import { AuthService } from '../service/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
  public mensagem: string = '';
  public mensagemErro: string = '';
  public botao: string = 'Enviar';
  public botaoDisabled: boolean = false;
  validErro:boolean = false;
  public routers: typeof routes = routes;
  constructor(private authService: AuthService) { }
  public formulario: FormGroup;
  public ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      matricula: new FormControl(null, [Validators.required])
    });
  }

  public aplicaCssErro(campo?: any) {

  }

  valid() {
    if (this.formulario.valid) {
      this.mensagemErro = '';
      this.sendLoginForm();
    }
  }
  sendLoginForm() {
    if (this.formulario.valid) {
      this.botao = 'Enviando';
      this.botaoDisabled = true;
      this.authService.mudarSenha(this.formulario.value).subscribe(
        () => {
          this.mensagem = 'Email enviado com sucesso'
        },
        (error) => {
          setTimeout(() => {  this.mensagemErro = ''},1400 );
          this.mensagemErro = error
          this.botaoDisabled = false;
          this.botao = 'Enviar';
        });
    }
  }
}
