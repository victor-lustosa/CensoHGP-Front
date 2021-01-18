import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-fatores',
  templateUrl: './cadastro-fatores.component.html',
  styleUrls: ['./cadastro-fatores.component.scss']
})
export class CadastroFatoresComponent implements OnInit {

  errors: String[];
  id: number;
  formulario: FormGroup;
  msgError: string;
  sucesso: boolean = false;
  constructor(private fatoresService: FatorRiscoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private location:Location) { }

    ngOnInit(): void {

      const fatores = this.activatedRoute.snapshot.data['fatores'];

      this.formulario = this.formBuilder.group({
        idFatorRisco: [fatores.idFatorRisco ],
        nome: [fatores.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [fatores.descricao]
      });
      this.msgError= null;
    }

    saveFatores(){
      this.fatoresService.save(this.formulario.value).subscribe(
        success => {
          this.formulario,
          this.sucesso = true,
          this.location.back(),
          console.log(success),
          console.log('fator salvo com sucesso');
        }, errorResponse => {
          console.log('Erro ao atualizar fatores de risco, servico ' + errorResponse),
          this.errors = ['Erro ao atualizar fator de risco.']
        }
      )
    }
    voltar(){
      this.router.navigate(['/checklists/fatores']);
    }
    resetar(){
      this.formulario.reset();
      this.msgError = null;
    }
  }
