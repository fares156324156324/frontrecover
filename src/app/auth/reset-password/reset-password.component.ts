import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/core/services';
import { InputService } from 'src/app/core/utils';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  protected resetForm!: FormGroup;
  protected controlForm: any;
  protected token = null;
  protected submitted = false;
  protected loading = true;
  protected email: any = null;

  constructor(
    private fb: FormBuilder,
    private inputService: InputService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.controlForm = this.inputService.getInputConfig('resetPassword');
    this.resetForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            InputService.noWhitespaceValidator,
            Validators.minLength(this.controlForm.passwordLengthMin),
            Validators.maxLength(this.controlForm.passwordLengthMax),
          ],
        ],
        repeatPassword: ['', []],
      },
      { validators: InputService.testMatch('password', 'repeatPassword', true) }
    );
    firstValueFrom(this.route.queryParams).then((data) => {
      this.token = data['token'];
      this.email = data['email'];
      if (!this.token || this.token === '') {
        this.router.navigate(['auth']);
      } else {
        this.location.replaceState('/auth/reset');
        this.authService
          .checkToken({ token: this.token, email: this.email })
          .then((suc) => {
            if (suc.success === 1) {
              this.loading = false;
            } else {
              this.toastrService.warning('Reset code has expired', 'Warning');
              this.router.navigate(['auth']);
            }
          })
          .catch(() => {
            this.toastrService.danger(
              'An error has occured, please try again',
              'Error'
            );
            this.router.navigate(['auth']);
          });
      }
    });
  }

  getFormValue(): any {
    let restData: any = {};
    const formValue = this.resetForm.value;
    restData.password = formValue.password as string;
    restData.token = this.token;
    restData.email = this.email;
    return restData;
  }

  resetPassword() {
    if (this.resetForm.valid) {
      this.resetForm.disable();
      this.authService
        .resetPassword(this.getFormValue())
        .then((suc) => {
          if (suc.success === 1) {
            this.toastrService.success(
              'Your Password has been reset',
              'Success'
            );
          } else {
            this.toastrService.warning('Reset code has expired', 'Warning');
          }
          this.router.navigate(['auth']);
        })
        .catch(() => {
          this.toastrService.danger(
            'An error has occured, please try again',
            'Error'
          );
          this.router.navigate(['auth']);
        })
        .finally(() => {
          this.resetForm.enable();
          this.resetForm.reset();
        });
    }
  }
}
