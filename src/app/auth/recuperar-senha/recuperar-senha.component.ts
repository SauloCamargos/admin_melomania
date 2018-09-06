import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
declare var bootbox: any;
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {
  f: FormGroup;
  errorCredentials = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    $('body').addClass("bg-login");
    this.createForm();
  }

  createForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.f.value).subscribe(
      (resp) => {
       if (resp.status == 'passwords.sent') {
         const $this = this;
        bootbox.alert({
          title: 'Atenção!',
          message: 'As instruções para recuperação foi enviado por e-mail. <br> Caso não receba em 24h contate o suporte.',
          callback: function () {
            $this.router.navigate(['/auth/login']);
          }
        });
       }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }
}
