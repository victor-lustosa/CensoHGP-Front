import { Component, OnInit } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fatores } from '../model/fatores';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  fatoresF:Fatores = null;
  status: boolean;
  lista: Fatores[];
  msgError: string;
  formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  currentPage = 1;
  data:string[];
  constructor(private fatoresService: FatorRiscoService,
    private formBuilder: FormBuilder, private location: Location) { }

    ngOnInit(): void {
      this.loadListaFatores();
      this.msgError= null;
      this.formulario = this.formBuilder.group({
        idFatorRisco: [null],
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        descricao: [null]
      })
    }
    dataCollection() {
      for (let i = 0; i < this.lista.length; i++) {
        let item = "Item" + i;
        this.data.push(item);
      }
    }
    updateForm(fatores: Fatores){
      if(this.fatoresF != null){
        this.formulario.reset();

        this.formulario.patchValue({
          idFatorRisco: fatores.idFatorRisco,
          nome:fatores.nome,
          descricao: fatores.descricao
        })
        location.reload();
      }else{
        this.formulario.patchValue({
          idFatorRisco: fatores.idFatorRisco,
          nome:fatores.nome,
          descricao: fatores.descricao
        }
      )
    }
  }

  editar(id:number){
    this.fatoresService.getById(id).subscribe((fatores) => {
      this.formulario.reset(),
      this.updateForm(fatores)

    });
  }
  loadListaFatores() {
    this.fatoresService.getAll()
    .subscribe(
      data => {
        this.lista = data;
        console.log(data);
      },
      error => {
        console.log('Erro serviço ' + error)
      })
    }
    saveFatores() {
      // editar um Fator de risco
      if (this.formulario.valid) {
        console.log(' safe fatores: '+this.fatoresF)
        if ( this.fatoresF != null) {
          this.fatoresService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true
              console.log(sucess),
              console.log('fator salvo com sucesso'),
              this.loadListaFatores();
              location.reload();
            },
            errorResponse => {
              console.log('Erro ao atualizar fatores de risco, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator de risco.']
            })
          }else if(this.fatoresF == null){
            //salvar um fator de risco
            this.fatoresService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                console.log('fator salvo com sucesso'),
                this.loadListaFatores();
                location.reload();
              },
              errorResponse => {
                console.log('Erro no salvar fatores de risco, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }
        // pesquisar(): void {
        //   this.fatoresService
        //   .getByNome(this.pesquisa)
        //   .subscribe(data =>{
        //     this.lista = data;
        //     console.log(data);
        //   })
        // }

      }
