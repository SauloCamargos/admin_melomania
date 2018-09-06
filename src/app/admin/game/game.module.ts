import { SharedModule } from './../../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameListComponent } from '../game/game-list/game-list.component';
import { RouterModule, Routes } from '@angular/router';
import { GameCreateComponent } from '../game/game-create/game-create.component';
import { GameDetailsComponent } from '../game/game-details/game-details.component';

const ROUTES: Routes = [
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
];


@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    // RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    GameComponent,
    GameListComponent,
    GameCreateComponent,
    GameDetailsComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
