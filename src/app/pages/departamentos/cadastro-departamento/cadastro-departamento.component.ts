import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoService, TipoDepartamentoService } from '../service';
import { Location } from '@angular/common';
import { TipoDepartamento } from '../model/tipoDepartamento';
@Component({
  selector: 'app-cadastro-departamento',
  templateUrl: './cadastro-departamento.component.html',
  styleUrls: ['./cadastro-departamento.component.scss']
})
export class CadastroDepartamentoComponent implements OnInit {

  @Input() public formulario: FormGroup;
  tipoDepartamentoRadio: any[];
  ativoRadio: any[];
  errors: String[];
  sucesso: boolean = false;
  descricao:string;
  ListaTipoDepartamento: TipoDepartamento[];
  constructor(
    public activeModal: NgbActiveModal,private departamentosService: DepartamentoService,
    private formBuilder: FormBuilder,private tipoDepartamentoService: TipoDepartamentoService,  location: Location) { }

    ngOnInit(): void {
      this.loadListaTipoDepartamento();

      // if(this.formulario.valid){
      //   this.formulario.value.tipoDepartamento.
      //    this.departamentosService.getById(this.formulario.value.idDepartamento)
      //      }
      console.log('id recebido no cadastro modal:' + this.formulario.get('idDepartamento').value);
      // this.tipoDepartamentoRadio = this.dropdownService.getTipoDepartamentos();
      // this.ativoRadio = this.dropdownService.getStatus();
    }
    loadListaTipoDepartamento() {
        this.tipoDepartamentoService.getAll()
        .subscribe(
          data => {
            this.ListaTipoDepartamento = data;
            console.log(data);
          },
          error => {
            console.log('Erro serviço ' + error)
          }
        )
      }

    saveDepartamentos() {
      // editar um Fator
      console.log(this.formulario.value);
      if (this.formulario.valid) {
        console.log('save departamentos id departamento  do formulario: '+this.formulario.value.idDepartamento +'id injetado pelo modal: '+ this.formulario.get('idDepartamento').value)
        if ( this.formulario.get('idDepartamento').value != null) {
          this.departamentosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true
              console.log(sucess),
              console.log('fator salvo com sucesso'),
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000);
            },
            errorResponse => {
              console.log('Erro ao atualizar departamentos, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar fator .']
            })
          } else {
            //salvar um fator
            this.departamentosService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(this.formulario.value),
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                console.log('fator salvo com sucesso'),
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000);

              },
              errorResponse => {
                console.log('Erro no salvar departamentos, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }
      }
