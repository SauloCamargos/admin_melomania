import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordValidation } from '../../shared/validators/password-validation/password-validation';


declare var $: any;
declare var bootbox: any;
declare var toastr: any;
@Component({
  selector: 'app-definir-senha',
  templateUrl: './definir-senha.component.html',
  styleUrls: ['./definir-senha.component.css']
})
export class DefinirSenhaComponent implements OnInit {

  f: FormGroup;
  errorCredentials = false;
  token: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    $('body').addClass('bg-login');
    this.token = this.activeRoute.snapshot.params['token'];
    console.log(this.token);
    this.activeRoute.params.subscribe(
      params => {
        this.token  = params['token'];
        if (this.token) {
          this.createForm(this.token);
        }
      }
    );
    }

  createForm(token) {
    this.f = undefined;
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      token: [token, Validators.required],
      password_confirmation: [null, Validators.required]
     }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  setPassword(value: any) {
    if ((this.f.controls.email.errors !== null) && this.f.controls.email.errors.required) {
      bootbox.alert({
        title: 'Atenção',
        className : 'error-alert',
        message: 'Informe e-mail para validarmos sua solicitação!'
      });
      return ;
    }

    if ((this.f.controls.password.errors !== null) && this.f.controls.password.errors.required) {
      bootbox.alert({
        title: 'Atenção',
        className : 'error-alert',
        message: 'Informe a nova senha!'
      });
      return ;
    }

    if ((this.f.controls.password_confirmation.errors !== null) && this.f.controls.password_confirmation.errors.MatchPassword) {
      bootbox.alert({
        title: 'Atenção',
        className : 'error-alert',
        message: 'As senhas não coicidem, verifique-as e tente novamente!'
      });
      return ;
    }
        this.authService.setNewPassword(this.f.value).subscribe(
          (response) => {
            if (response.status === 'passwords.token') {
              const $this = this;
              bootbox.alert({
                title: 'Atenção!',
                className: 'error-alert',
                message: response.response + '<br>' + 'Refaça a solicitação de redefinição de senha',
                callback: function(){
                  $this.router.navigate(['/auth/recuperar-senha']);
                }
              });
            } else {
              if (response.status === 'passwords.reset') {
                this.router.navigate(['/auth/login']);
                toastr.success('Senha atualizada com sucesso!');
              }
            }
          },
          (error) => {
            error = error.error;
            let errosMessage = ' ';
            if (error.errors.password) {
              errosMessage += error.errors.password.join('<br>') + ' <br>';
            }
            if (error.errors.email) {
              errosMessage += error.errors.email.join('<br>') + ' <br>';
            }
            bootbox.alert({
              title: 'Atenção!',
              className: 'error-alert',
              message: errosMessage
            });
          }
        );

    }


  createSetPasswordForm(){
    this.f = this.formBuilder.group({
      oldpassword: [null, [Validators.required]],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required]
     }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }
}

