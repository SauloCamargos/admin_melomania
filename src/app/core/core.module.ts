import { SettingsService } from './services/settings.service';
import { StateService } from './services/state.service';
import { ContestService } from './services/contest.service';
import { GameService } from './services/game.service';
import { OneSignalService } from './services/onesignal.service';
import { CrudService } from './services/crud.service';
import { NgModule } from '@angular/core';
import { LotteryService } from './services/lottery.service';

@NgModule({
  providers: [
    CrudService,
    GameService,
    ContestService,
    StateService,
    LotteryService,
    SettingsService,
    OneSignalService
]
})
export class CoreModule { }
