import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from  "rxjs/operators"
@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/authenticate`, credentials)
      .pipe(tap(data => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_type', data.token_type);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
      }));
  }

  logout(): void {
      localStorage.clear();
    this.http.get(`${environment.api_url}/authenticate/logout`).subscribe(resp => {
      this.router.navigate(['auth/login'], {replaceUrl: true});
    }, (error) => {
      this.router.navigate(['auth/login'], {replaceUrl: true});
    });
  }

  getUser(): any {
    try {
       return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
    } catch (e) {
        this.logout();
    }
  }

  setUser(): Promise<boolean> {
    return this.http.get<any>(`${environment.api_url}/authenticate`).toPromise()
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          return true;
        }
        return false;
      });
  }

  resetPassword(data: any) {
    return this.http.post<any>(`${environment.api_url}/password/email`, data);
  }

  setNewPassword(data: any) {
    return this.http.post<any>(`${environment.api_url}/password/reset`, data);
  }

}
