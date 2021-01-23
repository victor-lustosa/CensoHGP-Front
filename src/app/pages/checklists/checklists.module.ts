import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './../../theme/shared/filter.pipe';
import { ChecklistsRoutingModule } from './checklists-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [ FilterPipe],
  imports: [
    CommonModule,
    ChecklistsRoutingModule,
    SharedModule
  ]
})
export class ChecklistsModule { }
