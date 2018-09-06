import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any>(`${environment.api_url}/settings`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/settings/${id}`);
  }

  create(user: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/settings`, user);
  }

  getByName(user: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/settings/byName`, user);
  }

  getByNames(user: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/settings/byNames`, user);
  }

  getByGroup(user: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/settings/group`, user);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/settings/${id}`, user);
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/settings/${id}`);
  }

}
