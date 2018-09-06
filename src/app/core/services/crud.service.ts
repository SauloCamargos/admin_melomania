import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class CrudService {
  prefix_service = '';

  constructor(
    prefix: string,
    public http: HttpClient
  ) {
    this.prefix_service = prefix;
  }

  public getData(data): Observable<any> {
    if (data.page && data.qtd) {
      return this.http.get<any>(`${environment.api_url}/${this.prefix_service}?page=${data.page}&qtd=${data.qtd}`);
    }

    if (data.page) {
      return this.http.get<any>(`${environment.api_url}/${this.prefix_service}?page=${data.page}`);
    }

    if (data.qtd) {
      if (data.qtd === -1) {
        return this.http.get<any>(`${environment.api_url}/${this.prefix_service}/getAll`);
      }
      return this.http.get<any>(`${environment.api_url}/${this.prefix_service}?qtd=${data.qtd}`);
    }

    return this.http.get<any>(`${environment.api_url}/${this.prefix_service}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/${this.prefix_service}`, data);
  }

  public update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/${this.prefix_service}/${id}`, data);
  }

  public get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/${this.prefix_service}/${id}`);
  }

  public remove(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/${this.prefix_service}/${id}`);
  }

}
