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
  errors: String[];
  sucesso: boolean = false;
  descricao:string;
  ListaTipoDepartamento: TipoDepartamento[];
  constructor(
    public activeModal: NgbActiveModal,private departamentosService: DepartamentoService,
    private formBuilder: FormBuilder,private tipoDepartamentoService: TipoDepartamentoService,  location: Location) { }

    ngOnInit(): void {
      this.loadListaTipoDepartamento();
    }
    loadListaTipoDepartamento() {
        this.tipoDepartamentoService.getAll()
        .subscribe(
          data => {
            this.ListaTipoDepartamento = data;
          }
        )
      }
    saveDepartamentos() {
      if (this.formulario.valid) {
        if ( this.formulario.get('idDepartamento').value != null) {
          this.departamentosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              this.sucesso = true,
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000);
            })
          } else {
            this.departamentosService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.formulario,
                this.sucesso = true,
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000);
              })
            }
          }
        }
      }
