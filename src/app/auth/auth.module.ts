import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from "@nebular/theme";
import {
  AuthBlockComponent,
  AuthComponent,
  ForgetPasswordComponent,
  LoginComponent,
  ResetPasswordComponent,
} from ".";
// import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { HttpClientModule } from "@angular/common/http";

const COMPONENTS = [
  AuthBlockComponent,
  LoginComponent,
  ForgetPasswordComponent,
  ResetPasswordComponent,
  AuthComponent,
];

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  AuthRoutingModule,
  HttpClientModule,
  // SharedModule,
  NbCardModule,
  NbLayoutModule,
  NbIconModule,
  NbButtonModule,
  NbFormFieldModule,
  NbInputModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
})
export class AuthModule { }
