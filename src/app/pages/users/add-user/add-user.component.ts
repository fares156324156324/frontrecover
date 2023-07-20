import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef, NbToastrService } from "@nebular/theme";
import { UserService } from "src/app/core/services/user.service";
import { InputService } from "src/app/core/utils";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-add-update-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  @Input() user: User = new User({});

  public userForm!: FormGroup;
  public controlForm: any;
  protected loading = false;

  constructor (
    private fb: FormBuilder,
    private inputService: InputService,
    public dialogRef: NbDialogRef<AddUserComponent>,
    private userService: UserService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.controlForm = this.inputService.getInputConfig("createUser");
    this.userForm = this.fb.group({
      prenom: [
        this.user.username,
        [
          Validators.required,
          Validators.minLength(this.controlForm.prenom.prenomLenghtMin),
          Validators.maxLength(this.controlForm.prenom.prenomLengthMax),
        ],
      ],
      nom: [
        this.user.username,
        [
          Validators.required,
          Validators.minLength(this.controlForm.nom.nomLenghtMin),
          Validators.maxLength(this.controlForm.nom.nomLengthMax),
        ],
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.minLength(this.controlForm.email.emailLengthMin),
          Validators.maxLength(this.controlForm.email.emailLengthMax),
          Validators.pattern(new RegExp(this.controlForm.email.emailPattern)),
        ],
      ],
    });
  }

  getFormValue(): any {
    let createUserData: any = {};
    const formValue = this.userForm.value;
    createUserData.prenom = formValue.prenom as string;
    createUserData.nom = formValue.nom as string;
    createUserData.email = formValue.email as string;
    return createUserData;
  }

  submit() {
    if (this.userForm.valid) {
      this.loading = true;
      this.userService
        .creatUser(this.getFormValue())
        .then((response) => {
          if (response.code === 1) {
            this.toastrService.success("User Successfully added", "Success");
            this.dialogRef.close(true);
          }
        })
        .catch((err) => {
          if (err.status !== 401 && err.status !== 403 && err.status !== 0) {
            this.toastrService.danger("error", "error");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
