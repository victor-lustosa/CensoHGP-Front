import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistsRoutingModule } from './checklists-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChecklistsRoutingModule,
    SharedModule
  ]
})
export class ChecklistsModule { }
