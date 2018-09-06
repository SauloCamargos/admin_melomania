import { SharedModule } from './../../shared/shared.module';
import { ContestRoutingModule } from './contest-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestComponent } from './contest.component';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestCreateComponent } from './contest-create/contest-create.component';

@NgModule({
  imports: [
    CommonModule,
    ContestRoutingModule,
    SharedModule
  ],
  declarations: [ContestComponent, ContestListComponent, ContestDetailsComponent, ContestCreateComponent]
})
export class ContestModule { }
