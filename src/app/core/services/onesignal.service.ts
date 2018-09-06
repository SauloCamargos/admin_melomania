import { Injectable } from '@angular/core';


@Injectable()
export class OneSignalService {
  OneSignal = window['OneSignal'] || [];
  constructor() { }

  init() {
    let $this = this;
    this.OneSignal.push(function() {
      $this.OneSignal.init({
        appId: '2161d2d1-4977-4946-a87a-4bb9fc6dafd6',
        allowLocalhostAsSecureOrigin: true
      });
    });
  }
}
