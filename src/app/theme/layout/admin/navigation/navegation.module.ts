import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NavigationComponent } from './navigation.component';


@NgModule({
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  declarations: [NavigationComponent],
  exports: []
})
export class ModalModule { }
