import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(
    private _sanitizer: DomSanitizer
  ) {}

  transform(value: any, args?: any): any {
    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
