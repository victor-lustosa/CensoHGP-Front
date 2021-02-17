import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoService, TipoDepartamentoService } from '../service';

@Component({
  selector: 'app-cadastro-departamento',
  templateUrl: './cadastro-departamento.component.html',
  styleUrls: ['./cadastro-departamento.component.scss']
})
export class CadastroDepartamentoComponent implements OnInit {

  @Input() public formulario: FormGroup;
  errors: String[];
  sucesso: boolean = false;
  tipoDepartamentos:any;
  listaTipoDepartamento: any[];
  tituloModal: string;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  constructor(
    public activeModal: NgbActiveModal,private departamentosService: DepartamentoService,
    private tipoDepartamentoService:TipoDepartamentoService) { }

    ngOnInit(): void {
      console.log(this.tipoDepartamentos)
      this.loadListaTipoDepartamento();
    }
    loadListaTipoDepartamento() {
      this.tipoDepartamentoService.getAll()
      .subscribe(
        data => {
          this.listaTipoDepartamento = data;
          console.log(data);
        },
        error => {
          console.log('Erro serviço ' + error)
        }
      )
    }
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    saveDepartamentos() {
      if (this.formulario.valid) {
        if ( this.formulario.get('idDepartamento').value != null) {
          this.departamentosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroDepartamentoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500);
            },
            error => {
              alert(error)
            })
          } else {
            this.departamentosService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroDepartamentoComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500);
              },
              error => {
                alert(error);
              })
            }
          }
        }
      }
