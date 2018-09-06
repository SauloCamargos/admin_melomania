import { IntegrationsComponent } from './integrations/integrations.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './admin.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
          children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          { path: 'dashboard', component: AdminDashboardComponent, data: {breadcrumb: 'Dashboard'} },
          { path: 'integrations', component: IntegrationsComponent, data: {breadcrumb: 'Dashboard'} },
          { path: 'games', loadChildren: './../admin/game/game.module#GameModule' },
          { path: 'contests', loadChildren: './../admin/contest/contest.module#ContestModule' },
          { path: 'config-moip', loadChildren: './../admin/config-moip/config-moip.module#ConfigMoipModule' }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
