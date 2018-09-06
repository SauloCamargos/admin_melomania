import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { DefinirSenhaComponent } from './definir-senha/definir-senha.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    ProfileComponent,
    RecuperarSenhaComponent,
    DefinirSenhaComponent,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
