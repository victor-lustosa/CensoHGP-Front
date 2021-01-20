import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-cadastro-fatores',
  templateUrl: './cadastro-fatores.component.html',
  styleUrls: ['./cadastro-fatores.component.scss']
})
export class CadastroFatoresComponent implements OnInit {
  fatores: Fatores;
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
      this.formulario = this.formBuilder.group({
        idFatorRisco: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null]
      })

      this.activatedRoute.params.pipe(
        map((params: any) => params['id']),
        switchMap(id => this.fatoresService.getById(id))
      ).subscribe((fatores) => this.updateForm(fatores));

      this.msgError= null;
    }
    updateForm(fatores: Fatores){
      this.formulario.patchValue({
        idFatorRisco: fatores.idFatorRisco,
        nome:fatores.nome,
        descricao: fatores.descricao
      })
    }



    saveFatores() {
      // editar um Fator de risco
      if (this.formulario.valid) {
        if (this.formulario.get('idFatorRisco').value != null) {
          this.fatoresService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true,
              this.location.back();
              console.log(sucess),
              console.log('fator salvo com sucesso');
            },
            errorResponse => {
              console.log('Erro ao atualizar fatores de risco, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator de risco.']
            })
          }else{
            //salvar um fator de risco
            this.fatoresService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                console.log('fator salvo com sucesso'),
                this.location.back();
              },
              errorResponse => {
                console.log('Erro no salvar fatores de risco, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }

        voltar(){
          this.router.navigate(['/checklists/fatores']);
        }
        resetar(){
          this.formulario.reset();
          this.msgError = null;
        }
      }
