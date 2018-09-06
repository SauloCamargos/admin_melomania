import { Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class ContestService extends CrudService {

  constructor(http: HttpClient) {
    super('contests', http);
  }

  addLotterie(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/${this.prefix_service}/${id}/lotteries`, data);
  }

  removeLotterie(idContest: number, idLotterie: any): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/${this.prefix_service}/${idContest}/lotteries/${idLotterie}`);
  }

  getLotteries(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/${this.prefix_service}/${id}/lotteries`);
  }


}
