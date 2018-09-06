import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, ErrorHandler, Injector } from '@angular/core';

@Injectable()
export class AplicationErrorHandle extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  static handleError(error: HttpErrorResponse | any) {
    let errorMessage: string;
    if (error instanceof HttpErrorResponse) {
        const body = error.error || '';
        const err = body.error || JSON.stringify(body);
        errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${err}`;
        if (body.message !== undefined && body.message !== '') {
            body.title = 'Atenção!';
            body.className = 'error-alert';
            return Observable.throw(body);
        }
  } else {
    errorMessage = error.message ? error.message : error.toString();
    console.log(errorMessage);
  }
  return Observable.throw(errorMessage);
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      if (errorResponse.status === 400 &&
        (error.error === 'token_expired' || error.error === 'token_invalid' ||
          error.error === 'A token is required' || error.error === 'token_not_provided')) {
        this.goToLogin();
        return;
      }

      if (errorResponse.status === 401 && (error.error === 'token_expired' || error.error === 'token_has_been_blacklisted')) {
        this.goToLogin();
        return;
      }

      console.log(error);
      if (error.message !== undefined && error.message !== '') {
        return Observable.throw(error);
      }
    }

    super.handleError(errorResponse);
  }

  goToLogin(): void {
    const router = this.injector.get(Router);
    router.navigate(['auth/login']);
  }

}
