import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './../services/auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`${environment.api_url}/authenticate`).subscribe(data => {
      this.user = data;
    });
  }

}
