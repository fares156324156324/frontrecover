import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptorService } from './core/interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './core/interceptors/error-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbToastrService,
} from '@nebular/theme';
import { ForecastingComponent } from './IA/forecasting/forecasting.component';
import { KPIComponent } from './IA/kpi/kpi.component';

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  AuthModule,
  HttpClientModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  NbLayoutModule,
  NbMenuModule.forRoot(),
  NbThemeModule.forRoot({ name: 'corporate' }),
  NbSidebarModule.forRoot(),
  NbToastrModule.forRoot({}),
];

@NgModule({
  declarations: [AppComponent, ForecastingComponent, KPIComponent],
  imports: [...MODULES],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    NbToastrService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
