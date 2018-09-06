import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AplicationErrorHandle } from './app.error-handle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {provide: ErrorHandler, useClass: AplicationErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
// {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
