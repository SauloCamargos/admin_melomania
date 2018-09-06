import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  f: FormGroup;
  errorCredentials = false;
  carregando: boolean;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
     $('body').addClass('bg-login');
  }

  ngOnChanges() {
    this.createForm();
     $('body').addClass('bg-login');
  }

  createForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.errorCredentials = false;
    this.carregando = true;
    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.carregando = false;
        this.router.navigate(['admin']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
        this.carregando = false;
      }
    );
  }

}
