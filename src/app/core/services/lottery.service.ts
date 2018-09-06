import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class LotteryService extends CrudService {

  constructor(http: HttpClient) {
    super('lotterys', http);
  }




}
