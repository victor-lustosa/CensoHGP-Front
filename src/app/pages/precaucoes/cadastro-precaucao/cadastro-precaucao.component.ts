import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecaucaoService } from '../service/precaucao.service';
@Component({
  selector: 'app-cadastro-precaucao',
  templateUrl: './cadastro-precaucao.component.html',
  styleUrls: ['./cadastro-precaucao.component.scss']
})
export class CadastroPrecaucaoComponent implements OnInit {

  @Input() public formulario: FormGroup;
  @Input() tituloModal: string;

  errors: String[];
  sucesso: boolean = false;
  static atualizando = new EventEmitter<boolean>();
  at:boolean = true;
  mensagemErro: string= '';
  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private precaucoesService: PrecaucaoService) { }

    ngOnInit(): void {}
    public verificaValidTouched(campo: any) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }
    public aplicaCssErro(campo: any) {
      return {
        'border-red': this.verificaValidTouched(campo)
      };
    }
    valid(){
      if(this.formulario.valid){
        this.mensagemErro=''
        this.savePrecaucoes()}
        else{
        this.mensagemErro = "Por favor, preencha os campos obrigatórios";
      }
    }
    savePrecaucoes() {
      if (this.formulario.valid) {
        if (this.formulario.get('idPrecaucao').value != null) {
          this.precaucoesService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.sucesso = true,
              this.formulario.reset(),
              CadastroPrecaucaoComponent.atualizando.emit(this.at),
              setTimeout(() => {
                this.activeModal.close()
              }, 500)
            })
          }else {
            if(this.formulario.value.ativo != true){
              this.formulario.value.ativo = true;
            }
            this.precaucoesService.create(this.formulario.value)
            .subscribe(
              sucess => {
                this.sucesso = true,
                this.formulario.reset(),
                CadastroPrecaucaoComponent.atualizando.emit(this.at),
                setTimeout(() => {
                  this.activeModal.close()
                }, 500)
              }
            )
          }
        }
      }
    }
