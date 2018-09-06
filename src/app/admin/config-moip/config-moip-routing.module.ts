import { ConfigMoipComponent } from './config-moip.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: ConfigMoipComponent},
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigMoipRoutingModule { }
