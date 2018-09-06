import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RecuperarSenhaComponent } from './auth/recuperar-senha/recuperar-senha.component';
import { DefinirSenhaComponent } from './auth/definir-senha/definir-senha.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/recuperar-senha', component: RecuperarSenhaComponent },
      { path: 'auth/definir-senha/:token', component: DefinirSenhaComponent },
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
