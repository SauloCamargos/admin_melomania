
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { GameComponent } from './game.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: GameComponent, children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        { path: 'list', component: GameListComponent },
        { path: 'create', component: GameCreateComponent },
        { path: ':id', component: GameDetailsComponent }
        ]
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule { }
