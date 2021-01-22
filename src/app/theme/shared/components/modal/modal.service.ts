import { Injectable } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CadastroModalComponent} from './cadastro-modal/cadastro-modal.component'
export enum AlertTypes {
  CADASTRO_CHECKLIST = 'cadastro-checklist',
  SUCCESS = 'success',
  DANGER = 'danger'
}

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  // constructor(private modalService: BsModalService) {}
  //
  // showCadastroChecklist(title:string) {
  //   this.showCadastro(title, AlertTypes.CADASTRO_CHECKLIST);
  // }
  // showCadastro(title:string,type: AlertTypes) {
  //   const bsModalRef: BsModalRef = this.modalService.show(CadastroModalComponent);
  //   bsModalRef.content.type = type;
  //   bsModalRef.content.msg = title;
  //   return (<CadastroModalComponent>bsModalRef.content).confirmResult;
  // }
}
