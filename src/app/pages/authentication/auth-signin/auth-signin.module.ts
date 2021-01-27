import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
