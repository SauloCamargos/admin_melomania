import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigMoipComponent } from './config-moip.component';
import { SharedModule } from '../../shared/shared.module';
import { ConfigMoipRoutingModule } from './config-moip-routing.module';

@NgModule({
  imports: [
    CommonModule,
     SharedModule,
     ConfigMoipRoutingModule
  ],
  declarations: [ConfigMoipComponent]
})
export class ConfigMoipModule { }
