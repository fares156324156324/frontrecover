import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/core/services';
import { UserService } from 'src/app/core/services/user.service';
import { InputService, StorageService } from 'src/app/core/utils';

//
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected controlForm: any;
  protected showPassword = false;

  constructor (
    private inputService: InputService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastrService: NbToastrService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.controlForm = this.inputService.getInputConfig('login');
    this.loginForm = this.formBuilder.group({
      email: [
        'fares@example.com',
        [
          Validators.required,
          Validators.minLength(this.controlForm.emailLengthMin),
          Validators.maxLength(this.controlForm.emailLengthMax),
          Validators.pattern(new RegExp(this.controlForm.emailPattern)),
        ],
      ],
      password: [
        'faresfares',
        [
          Validators.required,
          InputService.noWhitespaceValidator,
          Validators.minLength(this.controlForm.passwordLengthMin),
          Validators.maxLength(this.controlForm.passwordLengthMax),
        ],
      ],
    });
  }
  getFormValue(): any {
    let loginData: any = {};
    const formValue = this.loginForm.value;
    loginData.email = formValue.email as string;
    loginData.password = formValue.password as string;
    return loginData;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginForm.disable();
      this.authService
        .login(this.getFormValue())
        .then((response) => {
          console.log(response)
          if (response.body.accessToken) {
            this.storageService.setAccessToken(
              response.body.accessToken
            );
            console.log(response.body.user)
            this.userService.setCurrentUser(response.body.user);
            this.toastrService.success('Login Success', 'Success');
            this.router.navigate(['dashboard']);
          }

        })
        .catch((error) => {
          this.toastrService.warning(error.statusText);
        })
        .finally(() => {
          this.loginForm.enable();
        });
    }
  }
}
