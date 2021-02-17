import { Component, OnInit, Input, EventEmitter, ViewChild, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbActiveModal,  NgbDatepicker,  NgbDatepickerI18n,  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../../departamentos/model/departamento';
import { Precaucao } from '../../precaucoes/model/precaucao';
import { DepartamentoService } from '../../departamentos/service';
import { PacienteService } from '../service/paciente.service';



const I18N_VALUES = {
  'pt': {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
  }
  // other languages you would support
};
@Injectable()
export class I18n {
  language = 'pt';
}



@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss'],
  // providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]

})
export class CadastroPacienteComponent implements OnInit {

  @Input() public formulario: FormGroup;
  @Input() public listaPrecaucoes:Precaucao[]=[];
  errors: String[];
  sucesso: boolean = false;
  model: NgbDateStruct;
  listaSexos:any[]=[];
  listaDepartamento:Departamento[]=[];

  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  constructor( private activeModal: NgbActiveModal,
    private pacientesService: PacienteService,private departamentoService:DepartamentoService) { }

    ngOnInit(): void {
      this.loadListaDepartamento();
      this.loadListaSexo();
      this.getPrecaucoes();
    }

    getPrecaucoes(){
      return this.formulario.get('precaucao') ? (<FormArray>this.formulario.get('precaucao')).controls : null;
    }

    loadListaSexo() {
      this.pacientesService.getAllSexos().subscribe(
        data => {
          this.listaSexos = data;
        })
      }
      loadListaDepartamento() {
        this.departamentoService.getAll()
        .subscribe(
          data => {
            this.listaDepartamento = data;
          })
        }
        public verificaValidTouched(campo: any) {
          return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
        }
        public aplicaCssErro(campo: any) {
          return {
            'border-red': this.verificaValidTouched(campo)
          };
        }
        savePacientes() {
          if (this.formulario.valid) {
            if (this.formulario.get('idPaciente').value != null) {
              this.pacientesService.update(this.formulario.value)
              .subscribe(
                sucess => {
                  this.sucesso = true,
                  this.formulario.reset(),
                  CadastroPacienteComponent.atualizando.emit(this.at),
                  setTimeout(() => {
                    this.activeModal.close()
                  }, 500)
                })
              } else {
                this.pacientesService.create(this.formulario.value)
                .subscribe(
                  sucess => {
                    this.sucesso = true,
                    this.formulario.reset(),
                    CadastroPacienteComponent.atualizando.emit(this.at),
                    setTimeout(() => {
                      this.activeModal.close()
                    }, 500)
                  }
                )
              }
            }
          }
        }
        // @Injectable()
        // export class CustomDatepickerI18n extends CadastroPacienteComponent {
        //
        //   constructor(private _i18n: I18n) {
        //     super();
        //   }
        //   getWeekdayShortName(weekday: number): string {
        //     return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
        //   }
        //   getMonthShortName(month: number): string {
        //     return I18N_VALUES[this._i18n.language].months[month - 1];
        //   }
        //   getMonthFullName(month: number): string {
        //     return this.getMonthShortName(month);
        //   }
        //
        //   getDayAriaLabel(date: NgbDateStruct): string {
        //     return `${date.day}-${date.month}-${date.year}`;
        //   }
        //   }
