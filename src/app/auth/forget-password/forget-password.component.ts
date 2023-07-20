import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/core/services';
import { InputService } from 'src/app/core/utils';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  public forgetForm!: FormGroup;
  public controlForm: any;
  public backendRespence = null;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private inputService: InputService,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.controlForm = this.inputService.getInputConfig('forget');
    this.forgetForm = this.fb.group({
      email: [
        'GillesBerie81@rhyta.com',
        [
          Validators.required,
          Validators.minLength(this.controlForm.emailLengthMin),
          Validators.maxLength(this.controlForm.emailLengthMax),
          Validators.pattern(new RegExp(this.controlForm.emailPattern)),
        ],
      ],
    });
  }

  getFormValue(): any {
    let loginData: any = {};
    const formValue = this.forgetForm.value;
    loginData.email = formValue.email as string;
    return loginData;
  }

  submitEmail() {
    if (this.forgetForm.valid) {
      this.forgetForm.disable();
      this.authService
        .forgetPassword(this.getFormValue())
        .then(() => {
          this.toastrService.success(
            'Please check your Email to reset your Password',
            'Success'
          );
          this.router.navigate(['auth']);
        })
        .catch(() => {
          this.toastrService.danger('Error', 'Error');
        })
        .finally(() => {
          this.forgetForm.enable();
          this.forgetForm.reset();
        });
    }
  }
}
