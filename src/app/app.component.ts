import { OneSignalService } from './core/services/onesignal.service';
import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
declare var $: any;
declare var AdminLTE: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,  AfterViewChecked {
  title = 'app';

  constructor(
    private oneSignalService: OneSignalService
  ) { }

  ngOnInit() {
    this.oneSignalService.init();
  }

  ngAfterViewChecked() {
    AdminLTE.init();
  }

}
