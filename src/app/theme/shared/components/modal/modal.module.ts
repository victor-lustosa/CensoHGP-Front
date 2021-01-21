import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { CadastroModalComponent } from './cadastro-modal/cadastro-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UiModalComponent, AnimationModalComponent, CadastroModalComponent],
  exports: [UiModalComponent, AnimationModalComponent]
})
export class ModalModule { }
