import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../service/usuarios.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {
  @Input() public formulario: FormGroup;

  errors: String[];
  sucesso: boolean = false;

  constructor(
    public activeModal: NgbActiveModal, public modalService: NgbModal, private usuariosService: UsuariosService, location: Location) { }

    ngOnInit(): void {
      console.log('id recebido no cadastro modal:' + this.formulario.get('idUsuario').value);
    }


    saveUsuarios() {
      // editar um Usuario
      if (this.formulario.valid) {
        console.log('save usuarios id usuario do formulario: ' + this.formulario.value.idUsuario + 'id injetado pelo modal: ' + this.formulario.get('idUsuario').value)
        if (this.formulario.get('idUsuario').value != null) {
          this.usuariosService.update(this.formulario.value)
          .subscribe(
            sucess => {
              this.formulario,
              console.log(sucess),
              this.sucesso = true,
              this.formulario.reset(),
              setTimeout(() => {
                this.activeModal.close(),
                location.reload();
              }, 1000)
            },
            errorResponse => {
              console.log('Erro ao atualizar usuarios, servico ' + errorResponse)
              this.errors = ['Erro ao atualizar paciente.']
            })
          } else {
            //salvar um paciente
            this.usuariosService.create(this.formulario.value)
            .subscribe(
              sucess => {
                console.log(sucess),
                this.formulario,
                this.sucesso = true,
                this.formulario.reset(),
                setTimeout(() => {
                  this.activeModal.close(),
                  location.reload();
                }, 1000)
              },
              errorResponse => {
                console.log('Erro no salvar usuarios, servico ' + errorResponse)
                this.errors = errorResponse.error.errors;
              })
            }
          }
        }
      }
