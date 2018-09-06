import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
// import { Observable } from 'rxjs/observable';
// import 'rxjs/add/operator/catch';

import { Observable } from "rxjs";
import { catchError, flatMap } from "rxjs/operators";
declare var bootbox: any;
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

 constructor(private injector: Injector, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError((errorResponse: HttpErrorResponse) => {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
      const refresh_token = localStorage.getItem('refresh_token');
      const access_token = localStorage.getItem('access_token');
   
        if (errorResponse.status === 401 ) {
          if (errorResponse.error.error !== 'token_scope_unauthorized') {
            // console.log("refresh token: "+refresh_token)
            if (errorResponse.url === `${environment.api_url}/authenticate/check`) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('token_type');
                bootbox.alert({
                  title: 'Atenção!',
                  className: 'error-alert',
                  message: 'Acesso revogado realize o login novamente para retomar o acesso as funcionalidades!'
                });
                this.router.navigate(['auth/login'], {replaceUrl: true});
            }

            if (errorResponse.url !== `${environment.api_url}/authenticate/refresh`) {
              const http = this.injector.get(HttpClient);
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('token_type');
              return http.post<any>(`${environment.api_url}/authenticate/refresh`, {
                refresh_token: refresh_token
              }).pipe(
                flatMap(data => {
                  localStorage.setItem('access_token', data.access_token);
                  localStorage.setItem('refresh_token', data.refresh_token);
                  localStorage.setItem('token_type', data.token_type);
                  const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.access_token}`}});

                  return next.handle(cloneRequest);
                })
              )
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('token_type');
                bootbox.alert({
                  title: 'Atenção!',
                  className: 'error-alert',
                  message: 'Acesso revogado realize o login novamente para retomar o acesso as funcionalidades!'
                });
                this.router.navigate(['auth/login'], {replaceUrl: true});
            }
          } else {
              bootbox.alert({
                title: 'Atenção!',
                className: 'error-alert',
                message: 'Você não tem permissão para acesso a está funcionalidade<br> ou alguma funcionalidade da qual está depende,\
                <br> contate o administrador para mais informações!'
              });
              this.router.navigate(['/admin'], {replaceUrl: true});
          }
        }

      return Observable.throw(errorResponse);
    })
    )
  }
}
