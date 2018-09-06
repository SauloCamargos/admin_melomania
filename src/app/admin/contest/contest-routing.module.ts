import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestCreateComponent } from './contest-create/contest-create.component';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestComponent } from './contest.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: ContestComponent, children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        { path: 'list', component: ContestListComponent },
        { path: 'create', component: ContestCreateComponent },
        { path: ':id', component: ContestDetailsComponent }
        ]
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ContestRoutingModule { }
