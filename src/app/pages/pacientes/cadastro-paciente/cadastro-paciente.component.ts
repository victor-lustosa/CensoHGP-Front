import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../../departamentos/model/departamento';
import { Precaucao } from '../../precaucoes/model/precaucao';
import { DepartamentoService } from '../../departamentos/service';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss'],
})
export class CadastroPacienteComponent implements OnInit {
  @Input() public formulario: FormGroup;
  @Input() public listaPrecaucoes:Precaucao[]=[];
  errors: String[];
  sucesso: boolean = false;
  listaSexos:any[]=[];
  listaDepartamento:Departamento[]=[];
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  constructor( private activeModal: NgbActiveModal,
    private pacientesService: PacienteService,private departamentoService:DepartamentoService) { }

    ngOnInit(): void {
      this.loadListaDepartamento();
      this.getPrecaucoes();
      this.listaSexos = this.pacientesService.getSexos();
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
